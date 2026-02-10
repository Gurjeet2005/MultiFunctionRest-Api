const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const EMAIL = process.env.OFFICIAL_EMAIL || "your_email@chitkara.edu.in";

let genAI = null;
let aiModel = null;

if (process.env.GEMINI_API_KEY) {
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        aiModel = genAI.getGenerativeModel({ model: "gemini-pro" });
        console.log("✓ Google Gemini AI configured successfully");
    } catch (error) {
        console.log("✗ Failed to initialize Google Gemini:", error.message);
    }
} else {
    console.log("✗ GEMINI_API_KEY not found in .env file");
    console.log("  Visit https://aistudio.google.com to get your free API key");
}

app.get("/health", (req, res) => {
    res.status(200).json({
        is_success: true,
        official_email: EMAIL
    });
});

app.post("/bfhl", async (req, res) => {
    try {
        const body = req.body;
        
   
        const keys = Object.keys(body);
        if (keys.length === 0) {
            return res.status(400).json({
                is_success: false,
                error: "Request body is empty"
            });
        }
        if (keys.length > 1) {
            return res.status(400).json({
                is_success: false,
                error: `Must have exactly ONE key. Found: ${keys.join(', ')}`
            });
        }
        
        
        const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
        const key = keys[0];
        if (!validKeys.includes(key)) {
            return res.status(400).json({
                is_success: false,
                error: `Invalid key: "${key}". Must be one of: ${validKeys.join(', ')}`
            });
        }
        
       
        let result;
        
        if (key === "fibonacci") {
            result = fibonacci(body.fibonacci);
        }
        else if (key === "prime") {
            result = getPrimes(body.prime);
        }
        else if (key === "lcm") {
            result = lcm(body.lcm);
        }
        else if (key === "hcf") {
            result = hcf(body.hcf);
        }
        else if (key === "AI") {
            result = await getAIResponse(body.AI); 
        }
        
     
        res.status(200).json({
            is_success: true,
            official_email: EMAIL,
            data: result
        });
        
    } catch (error) {
        res.status(400).json({
            is_success: false,
            error: error.message
        });
    }
});


function fibonacci(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Fibonacci input must be a non-negative integer");
    }
    
    if (n === 0) return [];
    if (n === 1) return [0];
    
    let result = [0, 1];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    
    return result;
}


function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}


function getPrimes(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("Prime input must be an array");
    }
    return arr.filter(num => Number.isInteger(num) && num > 0 && isPrime(num));
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}


function lcm(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("LCM input must be a non-empty array");
    }
    
    const validNums = arr.filter(num => Number.isInteger(num) && num !== 0);
    if (validNums.length === 0) {
        throw new Error("LCM requires at least one non-zero integer");
    }
    
    let result = validNums[0];
    for (let i = 1; i < validNums.length; i++) {
        result = Math.abs(result * validNums[i]) / gcd(result, validNums[i]);
    }
    
    return result;
}


function hcf(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("HCF input must be a non-empty array");
    }
    
    const validNums = arr.filter(num => Number.isInteger(num) && num !== 0);
    if (validNums.length === 0) {
        throw new Error("HCF requires at least one non-zero integer");
    }
    
    let result = validNums[0];
    for (let i = 1; i < validNums.length; i++) {
        result = gcd(result, validNums[i]);
    }
    
    return result;
}


async function getAIResponse(question) {
   
    if (typeof question !== 'string' || question.trim().length === 0) {
        throw new Error("AI input must be a non-empty string");
    }
    
   
    if (!aiModel) {
        throw new Error("AI service not configured. Please set GEMINI_API_KEY in .env file");
    }
    
    try {
        
        const prompt = `Answer the following question in ONLY 1-3 words. Be concise and direct. Question: ${question}`;
        
        const result = await aiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        
      
        const words = text.split(/\s+/);
        return words.slice(0, 3).join(' ');
        
    } catch (error) {
        console.error('Google Gemini AI Error:', error.message);
        throw new Error('Failed to get AI response. Please try again later.');
    }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Port: ${PORT}`);
    console.log(`Email: ${EMAIL}`);
    console.log(`AI: ${aiModel ? 'Enabled ✓' : 'Disabled ✗'}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`POST: http://localhost:${PORT}/bfhl`);
});

module.exports = app;