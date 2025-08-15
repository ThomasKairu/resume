const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const analyzeRoutes = require('./routes/analyze');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 3003;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});
app.use(limiter);

// CORS configuration - Fixed for production deployment
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? (process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
  : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'https://www.jobix.publicvm.com'];

app.use((req, res, next) => {
  console.log('Incoming Origin:', req.headers.origin);
  next();
});

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api', analyzeRoutes);
app.use('/api', healthRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON format',
      code: 'INVALID_JSON'
    });
  }
  
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: 'Request payload too large',
      code: 'PAYLOAD_TOO_LARGE'
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    code: 'NOT_FOUND'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Resume Analyzer API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Analyze endpoint: http://localhost:${PORT}/api/analyze`);
  
  // Log environment info for debugging
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Allowed origins: ${JSON.stringify(allowedOrigins)}`);
});

module.exports = app;