const { MessageEmbed } = require('discord.js');
const musicService = require('../services/musicService');

module.exports = {
    name: 'pause',
    description: 'Pauses the currently playing song.',
    async execute(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to pause the music!');
        }

        try {
            const isPaused = await musicService.pauseMusic(message.guild.id);
            if (!isPaused) {
                return message.channel.send('There is no music currently playing to pause.');
            }

            const embed = new MessageEmbed()
                .setColor('#F1C40F')
                .setTitle('Music Paused')
                .setDescription('The currently playing song has been paused.')
                .setTimestamp();
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to pause the music. Please try again later.');
        }
    },
};