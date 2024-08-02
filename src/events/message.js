const { Events } = require('discord.js');
const musicService = require('../services/musicService');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Ignore bot messages
        if (message.author.bot) return;

        // Command handling
        const prefix = '!';
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Command execution
        const command = require(`../commands/${commandName}`);
        if (!command) return message.reply("Unknown command!");

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error('Error executing command:', error);
            message.reply('There was an error trying to execute that command!');
        }
    },
};