const { MessageEmbed } = require('discord.js');
const musicService = require('../services/musicService');

module.exports = {
    name: 'stop',
    description: 'Stops the music and clears the queue.',
    async execute(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to stop the music!');
        }

        try {
            await musicService.stopMusic(message.guild.id);
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Music Stopped')
                .setDescription('The music has been stopped and the queue has been cleared.')
                .setTimestamp();
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to stop the music. Please try again later.');
        }
    },
};