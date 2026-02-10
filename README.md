# Multi Function REST API

A multifunctional REST API built using Node.js and Express that performs mathematical computations and integrates AI responses. This API supports Fibonacci series generation, prime number filtering, LCM and HCF calculation, and AI-powered single-word answers using Google Gemini. The project follows strict API response structure, proper HTTP status codes, robust input validation, error handling, and security best practices. It is designed for serverless deployment and is publicly accessible via cloud platforms like Vercel.

---

# Features

* Generate Fibonacci series
* Filter prime numbers from an array
* Calculate LCM of numbers
* Calculate HCF of numbers
* AI-powered single-word responses using Gemini API
* Standardized JSON response structure
* Proper HTTP status codes
* Robust validation and error handling
* Serverless deployment ready

---

# Tech Stack

* Node.js
* Express.js
* Google Gemini API
* Vercel (Deployment)
* GitHub (Version Control)

---

# API Endpoints

## GET /health

Health check endpoint.

Response:

```
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in"
}
```

---

## POST /bfhl

Accepts one of the following keys:

### Fibonacci

Request:

```
{
  "fibonacci": 7
}
```

Response:

```
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [0,1,1,2,3,5,8]
}
```

---

### Prime

Request:

```
{
  "prime": [2,4,7,9,11]
}
```

Response:

```
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [2,7,11]
}
```

---

### LCM

Request:

```
{
  "lcm": [12,18,24]
}
```

Response:

```
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 72
}
```

---

### HCF

Request:

```
{
  "hcf": [24,36,60]
}
```

Response:

```
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 12
}
```

---

### AI

Request:

```
{
  "AI": "What is the capital of Maharashtra?"
}
```

Response:

```
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": "Mumbai"
}
```

---

# Installation and Setup

Clone the repository:

```
git clone https://github.com/your-username/bfhl-api.git
```

Navigate to project folder:

```
cd bfhl-api
```

Install dependencies:

```
npm install
```

Create .env file:

```
GEMINI_API_KEY=your_api_key_here
```

Run server:

```
node server.js
```

---

# Deployment

This project is deployed using Vercel serverless platform.

Steps:

* Push code to GitHub
* Import repository in Vercel
* Add environment variables
* Deploy

---

# Project Structure

```
bfhl-api/
│
├── server.js
├── .gitignore
├── package.json
└── README.md
```

---

# Author

Gurjeet Singh
