const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');
const logger = require('./utils/logger');
const config = require('./utils/config');
const musicService = require('./services/musicService');
const userService = require('./services/userService');
const commandHandler = require('./services/commandHandler');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Successfully connected to MongoDB');
  })
  .catch(err => {
    logger.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setup Discord Client
const discordClient = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
]});

// Command listener for Discord bot
discordClient.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith('!')) return;
  const command = message.content.slice(1).trim().split(' ')[0];
  await commandHandler.handleCommand(command, message);
});

// Event listener for when the bot is ready
discordClient.once('ready', () => {
  logger.info(`Logged in as ${discordClient.user.tag}`);
});

// Start the Discord bot
discordClient.login(process.env.DISCORD_TOKEN)
  .then(() => {
    logger.info('Discord bot is online');
  })
  .catch(err => {
    logger.error('Error logging in to Discord:', err);
    process.exit(1);
  });

// Middleware for parsing JSON
app.use(express.json());

// Placeholder route for API (can be expanded)
app.get('/', (req, res) => {
  res.send('Welcome to the Discord Music Bot API');
});

// Start Express server
app.listen(PORT, () => {
  logger.info(`Express server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down gracefully...');
  await discordClient.destroy();
  await mongoose.connection.close();
  logger.info('Shutdown complete');
  process.exit(0);
});