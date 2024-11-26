const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../models/url.model');

// Create short URL
exports.shortenUrl = async (req, res) => {
  try {
    const { url } = req.body;

    // Check if the URL is valid
    if (!validUrl.isUri(url)) {
      return res.status(400).json({
        error: 'Invalid URL provided'
      });
    }

    // Generate short ID
    const shortId = nanoid(8);

    // Create URL record
    const urlRecord = new Url({
      originalUrl: url,
      shortId,
    });

    await urlRecord.save();

    return res.status(201).json({
      success: true,
      originalUrl: url,
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
      shortId,
    });

  }
  catch (error) {
    console.error('Error shortening URL:', error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
};

// Redirect to original URL
exports.redirectToUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({
        error: 'URL not found'
      });
    }

    // Update stats
    url.clicks += 1;
    url.lastAccessed = new Date();
    await url.save();

    return res.redirect(
      url.originalUrl
    );

  }
  catch (error) {
    console.error('Error redirecting:', error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
};

// Get URL stats
exports.getUrlStats = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    return res.json({
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
      createdAt: url.createdAt,
    });

  }
  catch (error) {
    console.error('Error getting stats:', error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
};
