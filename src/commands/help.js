const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands and their descriptions.',
    execute(message) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Available Commands')
            .setDescription('Here is a list of commands you can use:')
            .addFields(
                { name: '!play {song}', value: 'Plays the specified song from YouTube or Spotify.' },
                { name: '!pause', value: 'Pauses the currently playing song.' },
                { name: '!skip', value: 'Skips the current song in the queue.' },
                { name: '!stop', value: 'Stops the music and clears the queue.' },
                { name: '!queue', value: 'Displays the current song queue.' },
                { name: '!volume {level}', value: 'Sets the volume of the music playback.' },
                { name: '!help', value: 'Displays this help message.' }
            )
            .setTimestamp()
            .setFooter('Enjoy your music experience on Discord!');

        message.channel.send({ embeds: [embed] });
    },
};