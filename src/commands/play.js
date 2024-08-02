const { MessageEmbed } = require('discord.js');
const musicService = require('../services/musicService');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

module.exports = {
    name: 'play',
    description: 'Plays a specified song from YouTube or Spotify.',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to play music!');
        }
        
        const songQuery = args.join(' ');
        if (!songQuery) {
            return message.channel.send('Please provide the name or link of a song to play!');
        }

        try {
            let songInfo;
            if (ytdl.validateURL(songQuery)) {
                songInfo = await ytdl.getInfo(songQuery);
            } else {
                const results = await youtube.searchVideos(songQuery, 1);
                if (!results.length) {
                    return message.channel.send('No results found for your query. Please try again.');
                }
                songInfo = await ytdl.getInfo(results[0].url);
            }

            const song = {
                title: songInfo.title,
                url: songInfo.video_url,
                requestedBy: message.author.username,
            };

            await musicService.addToQueue(message.guild.id, song);
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Song Added to Queue')
                .setDescription(`Added ${song.title} to the queue.`)
                .addField('Requested By:', song.requestedBy)
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
            if (!musicService.isPlaying(message.guild.id)) {
                await musicService.playNext(message.guild.id, voiceChannel);
            }
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while trying to play the song. Please try again later.');
        }
    },
};