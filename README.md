# URL Shortener API

A simple and efficient URL shortener API built with Node.js, Express, and MongoDB.

## Deployment Link
```bash
https://shorturl-zhlq.onrender.com/
```

## API Documentation
Access the interactive API documentation at:
```bash
https://shorturl-zhlq.onrender.com/api-docs
```

## Features

- Shorten long URLs
- Redirect to original URLs
- Track usage statistics
- Rate limiting
- MongoDB integration
- Interactive API documentation with Swagger UI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
```bash
cp .env
```

4. Update the .env file with your configuration:
```
PORT = 3000
MONGODB_URI = your_mongodb_connection_string
BASE_URL= your_base_url for API Documentation
RATE_LIMIT_WINDOW_MS = 60000
RATE_LIMIT_MAX_REQUESTS = 100
```

## Usage

1. Start the server:
```bash
npm run dev
```

## API Endpoints

### 1. Shorten URL
- **POST** `https://shorturl-zhlq.onrender.com/shorten`
- **Body**: 
```json
{
    "url": "https://example.com/very-long-url"
}
```
- **Header**:
```json
{
    "Content-Type": "application/json"
}
```
- **Response**:
```json
{
    "shortUrl": "https://shorturl-zhlq.onrender.com/abc123",
    "shortId": "abc123"
}
```

### 2. Redirect to Original URL
- **GET** `https://shorturl-zhlq.onrender.com/:shortId`
- Redirects to the original URL

### 3. Get URL Statistics
- **GET** `https://shorturl-zhlq.onrender.com/stats/:shortId`
- **Response**:
```json
{
    "originalUrl": "https://example.com/very-long-url",
    "shortId": "abc123",
    "clicks": 42,
    "lastAccessed": "2024-01-01T12:00:00.000Z",
    "createdAt": "2024-01-01T10:00:00.000Z"
}
```

## Rate Limiting

The API implements rate limiting to prevent fast access to the API. The following rate limits are applied:
- 100 requests per minute per IP address
- Configurable through environment variables

## Error Handling

The API returns appropriate HTTP status codes:
- 400: Invalid URL
- 200: Success
- 404: URL not found
- 429: Too many requests
- 500: Server error