const { Events } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        logger.info(`Logged in as ${client.user.tag} - Bot is ready to serve!`);

        // Set the bot's status
        client.user.setActivity('🎶 Music! Type !help for commands', { type: 'LISTENING' })
            .then(() => logger.info('Bot is now listening for commands.'))
            .catch(error => logger.error('Error setting bot status:', error));
    },
};