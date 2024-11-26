const express = require('express');
const router = express.Router();
const { shortenUrl, redirectToUrl, getUrlStats } = require('../controllers/url.controller');

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Create a shortened URL
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to shorten
 *     responses:
 *       200:
 *         description: URL shortened successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   example: https://shorturl-zhlq.onrender.com/abc123
 *                 shortId:
 *                   type: string
 *                   example: abc123
 *       400:
 *         description: Invalid URL provided
 */
router.post('/shorten', shortenUrl);

/**
 * @swagger
 * /{shortId}:
 *   get:
 *     summary: Redirect to original URL
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         description: The short ID of the URL
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: URL not found
 */
router.get('/:shortId', redirectToUrl);

/**
 * @swagger
 * /stats/{shortId}:
 *   get:
 *     summary: Get URL statistics
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         description: The short ID of the URL
 *     responses:
 *       200:
 *         description: URL statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                   example: https://example.com/very-long-url
 *                 shortId:
 *                   type: string
 *                   example: abc123
 *                 clicks:
 *                   type: number
 *                   example: 42
 *                 lastAccessed:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-01-01T12:00:00.000Z
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-01-01T10:00:00.000Z
 *       404:
 *         description: URL not found
 */
router.get('/stats/:shortId', getUrlStats);

module.exports = router;
