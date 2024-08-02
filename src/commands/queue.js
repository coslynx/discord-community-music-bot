const { MessageEmbed } = require('discord.js');
const musicService = require('../services/musicService');

module.exports = {
    name: 'queue',
    description: 'Displays the current song queue.',
    async execute(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to view the queue!');
        }

        try {
            const queue = await musicService.getQueue(message.guild.id);
            if (!queue || queue.length === 0) {
                return message.channel.send('The queue is currently empty.');
            }

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Current Song Queue')
                .setDescription('Here are the songs in the queue:')
                .setTimestamp();

            queue.forEach((song, index) => {
                embed.addField(`${index + 1}. ${song.title}`, `Requested by: ${song.requestedBy}`, false);
            });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to fetch the queue. Please try again later.');
        }
    },
};