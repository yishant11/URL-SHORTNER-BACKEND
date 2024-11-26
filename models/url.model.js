const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  versionKey: false  // This will remove the __v field
});

// Create index on shortId for faster lookups
urlSchema.index({ shortId: 1 });

module.exports = mongoose.model('Url', urlSchema);
