const { MessageEmbed } = require('discord.js');
const musicService = require('../services/musicService');

module.exports = {
    name: 'skip',
    description: 'Skips the current song in the queue.',
    async execute(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to skip the music!');
        }

        try {
            const currentQueue = await musicService.getQueue(message.guild.id);
            if (!currentQueue || currentQueue.length === 0) {
                return message.channel.send('There are no songs in the queue to skip.');
            }

            await musicService.skipTrack(message.guild.id);
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Song Skipped')
                .setDescription('The current song has been skipped!')
                .setTimestamp();
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to skip the song. Please try again later.');
        }
    },
};