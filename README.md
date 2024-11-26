# URL Shortener API

A simple and efficient URL shortener API built with Node.js, Express, and MongoDB.

## Deployment Link
```bash
https://url-shortner-backend-he4o.onrender.com
```

## API Documentation
Access the interactive API documentation at:
```bash
https://url-shortner-backend-he4o.onrender.com/api-docs
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
git clone Your_Repository_URL
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
MONGODB_URI = YOUR_MONGODB_URI
BASE_URL= your_base_url
RATE_LIMIT_WINDOW_MS = 
RATE_LIMIT_MAX_REQUESTS = 
```

## Usage

1. Start the server:
```bash
npm run dev
```

## API Endpoints

### 1. Shorten URL
- **POST** `https://url-shortner-backend-he4o.onrender.com/shorten`
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
    "shortUrl": "https://url-shortner-backend-he4o.onrender.com/GeneratedShortid",
    "shortId": "GeneratedShortid"
}
```

### 2. Redirect to Original URL
- **GET** `https://url-shortner-backend-he4o.onrender.com/:shortId`
- Redirects to the original URL

### 3. Get URL Statistics
- **GET** `https://url-shortner-backend-he4o.onrender.com/stats/:shortId`
- **Response**:
```json
{
    "originalUrl": "https://expample.com",
    "shortId": "GeneratedShortid",
    "clicks": 0,
    "lastAccessed": "2024-01-01T12:00:00.000Z",
    "createdAt": "2024-01-01T10:00:00.000Z"
}
```

## Rate Limiting
- 100 requests per minute per IP address
- Configurable through environment variables

## Error Handling

The API returns appropriate HTTP status codes:
- 400: Invalid URL
- 200: Success
- 404: URL not found
- 429: Too many requests
- 500: Server error