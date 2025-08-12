# AI Resume Analyzer Backend

A secure, scalable Node.js backend API for analyzing resumes against job descriptions using AI-powered analysis via Pollinations.AI with intelligent fallback to keyword matching.

## Features

- **AI-Powered Analysis**: Uses Pollinations.AI for intelligent resume analysis
- **Intelligent Fallback**: Automatic fallback to keyword-based analysis if AI service is unavailable
- **Security**: Rate limiting, CORS, input validation, and security headers
- **Scalability**: Modular architecture with separated concerns
- **Validation**: Comprehensive input validation using Joi
- **Error Handling**: Robust error handling with meaningful responses

## API Endpoints

### POST /api/analyze
Analyzes a resume against a job description.

**Request Body:**
```json
{
  "resumeText": "Your resume content here...",
  "jobDescription": "Job description content here..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "matchScore": 75,
    "missingKeywords": ["python", "machine learning", "aws"],
    "matchedKeywords": ["javascript", "react", "node.js"],
    "suggestedAdditions": "Consider highlighting experience with...",
    "totalJobKeywords": 20,
    "analysisTimestamp": "2024-01-15T10:30:00.000Z",
    "analysisMethod": "AI-Powered"
  }
}
```

### GET /api/health
Returns server health status.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "memory": {
    "used": 45,
    "total": 128,
    "unit": "MB"
  },
  "version": "1.0.0",
  "environment": "development"
}
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. For production:
   ```bash
   npm start
   ```

## Project Structure

```
backend/
├── routes/           # API route handlers
│   ├── analyze.js    # Resume analysis endpoints
│   └── health.js     # Health check endpoints
├── services/         # Business logic
│   └── keywordService.js  # Keyword extraction and matching
├── server.js         # Main application entry point
├── package.json      # Dependencies and scripts
└── README.md         # Documentation
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for specific frontend origins
- **Input Validation**: Joi schema validation for all inputs
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: Sanitized error responses

## Algorithm Details

The analysis system uses:

1. **Primary AI Analysis**: Pollinations.AI OpenAI-compatible endpoint for intelligent resume analysis
2. **Fallback System**: Advanced keyword matching when AI is unavailable
   - Text Normalization: Lowercase conversion, punctuation removal
   - Stopword Removal: Filters common words while preserving technical terms
   - Phrase Extraction: Identifies multi-word technical phrases
   - Stemming: Porter Stemmer for better keyword matching
   - Scoring: (matched keywords / total job keywords) × 100
3. **Response Validation**: Ensures AI responses are properly formatted and sanitized

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Allowed frontend URL for CORS

## Testing

Run tests with:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License