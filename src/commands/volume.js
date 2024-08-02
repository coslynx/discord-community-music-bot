const { MessageEmbed } = require('discord.js');
const musicService = require('../services/musicService');

module.exports = {
    name: 'volume',
    description: 'Sets the volume of the music playback.',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to adjust the volume!');
        }

        const volumeLevel = parseInt(args[0]);
        if (isNaN(volumeLevel) || volumeLevel < 0 || volumeLevel > 100) {
            return message.channel.send('Please provide a valid volume level between 0 and 100.');
        }

        try {
            await musicService.setVolume(message.guild.id, volumeLevel);
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Volume Updated')
                .setDescription(`The volume has been set to ${volumeLevel}!`);
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to set the volume. Please try again later.');
        }
    },
};