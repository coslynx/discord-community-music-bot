const { Events } = require('discord.js');
const musicService = require('../services/musicService');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const guildId = oldState.guild.id;

        // Check if the user left a voice channel
        if (oldState.channelId && !newState.channelId) {
            const queue = await musicService.getQueue(guildId);
            if (queue) {
                // Check if there are no users left in the voice channel
                const voiceChannel = oldState.channel;
                if (voiceChannel.members.size === 1) { // Only the bot is left
                    await musicService.stopMusic(guildId);
                }
            }
        }
        
        // Check if the user joined a channel
        if (!oldState.channelId && newState.channelId) {
            // If the bot is to join a channel, handle any player states
            const queue = await musicService.getQueue(guildId);
            if (queue) {
                await musicService.playNext(guildId, newState.channel);
            }
        }
    },
};