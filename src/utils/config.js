const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Configuration object for the application
const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  LASTFM_API_KEY: process.env.LASTFM_API_KEY,
};

// Validate environment variables
const validateConfig = () => {
  const requiredConfigs = [
    'MONGODB_URI',
    'DISCORD_TOKEN',
    'YOUTUBE_API_KEY',
    'SPOTIFY_CLIENT_ID',
    'SPOTIFY_CLIENT_SECRET',
    'LASTFM_API_KEY',
  ];

  requiredConfigs.forEach((key) => {
    if (!config[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
};

// Validate the configuration at start-up
validateConfig();

module.exports = config;