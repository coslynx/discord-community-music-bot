const { getVoiceConnection } = require('@discordjs/voice');
const { Song } = require('../models/song');
const queueService = require('./queueService');
const userService = require('./userService');
const apiService = require('./apiService');

class MusicService {
    constructor() {
        this.currentlyPlaying = new Map();
    }

    async addToQueue(guildId, song) {
        queueService.addToQueue(guildId, song);
    }

    async playNext(guildId, voiceChannel) {
        const queue = queueService.getQueue(guildId);
        if (queue.length === 0) return this.stopMusic(guildId);

        const song = queue[0];
        const connection = getVoiceConnection(guildId);

        if (!connection) {
            await this.joinVoiceChannel(voiceChannel);
        }

        const resource = await this.createAudioResource(song.url);
        const player = connection.state.subscription.player;
        player.play(resource);

        player.on('idle', async () => {
            queueService.removeFromQueue(guildId, 0);
            await this.playNext(guildId, voiceChannel);
        });

        player.on('error', error => {
            console.error(`Error playing song: ${error.message}`);
            this.stopMusic(guildId);
        });

        this.currentlyPlaying.set(guildId, song.title);
    }

    async joinVoiceChannel(voiceChannel) {
        const connection = await voiceChannel.join();
        connection.on('error', error => {
            console.error(`Connection error: ${error.message}`);
            this.stopMusic(voiceChannel.guild.id);
        });
        return connection;
    }

    async stopMusic(guildId) {
        const connection = getVoiceConnection(guildId);
        if (connection) connection.destroy();

        queueService.clearQueue(guildId);
        this.currentlyPlaying.delete(guildId);
    }

    async setVolume(guildId, volumeLevel) {
        const connection = getVoiceConnection(guildId);
        if (connection) {
            const player = connection.state.subscription.player;
            player.setVolume(volumeLevel / 100);
        }
    }

    async pauseMusic(guildId) {
        const connection = getVoiceConnection(guildId);
        if (connection) {
            const player = connection.state.subscription.player;
            player.pause();
            return true;
        }
        return false;
    }

    async resumeMusic(guildId) {
        const connection = getVoiceConnection(guildId);
        if (connection) {
            const player = connection.state.subscription.player;
            player.unpause();
            return true;
        }
        return false;
    }

    async skipTrack(guildId) {
        const connection = getVoiceConnection(guildId);
        if (connection) {
            const player = connection.state.subscription.player;
            player.stop();
        }
    }

    async getQueue(guildId) {
        return queueService.getQueue(guildId);
    }

    async getCurrentlyPlaying(guildId) {
        return this.currentlyPlaying.get(guildId) || null;
    }
}

module.exports = new MusicService();