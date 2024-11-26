require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const urlRoutes = require('./routes/url.routes');
const rateLimit = require('express-rate-limit');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Connect to MongoDB
connectDB();

// Rate limiting middleware for general routes
const generalLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS, // 1 minute
  max: process.env.RATE_LIMIT_MAX_REQUESTS, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Please try again after some time'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for stats endpoint
    return req.path.startsWith('/stats/');
  }
});

// Apply rate limiting to all requests except stats
app.use(generalLimiter);

// Middleware
app.use(cors({
  origin:process.env.BASE_URL,
  credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
      description: 'A simple URL shortener API'
    },
    servers: [
      {
        url: 'https://shorturl-zhlq.onrender.com',
        description: 'Production server'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/', urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at https://shorturl-zhlq.onrender.com/api-docs`);
});
