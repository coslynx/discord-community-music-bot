const { getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { Song } = require('../models/song');
const userService = require('./userService');
const musicService = require('./musicService');

class QueueService {
    constructor() {
        this.queue = new Map();
    }

    addToQueue(guildId, song) {
        if (!this.queue.has(guildId)) {
            this.queue.set(guildId, []);
        }
        this.queue.get(guildId).push(song);
    }

    getQueue(guildId) {
        return this.queue.get(guildId) || [];
    }

    removeFromQueue(guildId, songIndex) {
        if (this.queue.has(guildId)) {
            this.queue.get(guildId).splice(songIndex, 1);
        }
    }

    clearQueue(guildId) {
        if (this.queue.has(guildId)) {
            this.queue.delete(guildId);
        }
    }

    isQueueEmpty(guildId) {
        return !this.queue.has(guildId) || this.queue.get(guildId).length === 0;
    }

    async playNext(guildId, voiceChannel) {
        const connection = getVoiceConnection(guildId);
        const queue = this.getQueue(guildId);

        if (!connection) {
            const player = createAudioPlayer();
            connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            connection.subscribe(player);
        }

        if (this.isQueueEmpty(guildId)) {
            return this.stopMusic(guildId);
        }

        const song = queue[0];
        const resource = createAudioResource(song.url);

        player.play(resource);

        player.on(AudioPlayerStatus.Playing, () => {
            console.log(`Playing ${song.title}`);
        });

        player.on(AudioPlayerStatus.Idle, async () => {
            this.removeFromQueue(guildId, 0);
            await this.playNext(guildId, voiceChannel);
        });

        player.on('error', error => {
            console.error(`Error: ${error.message}`);
        });

        connection.on('error', error => {
            console.error(`Connection Error: ${error.message}`);
            this.clearQueue(guildId);
        });
    }

    async stopMusic(guildId) {
        const connection = getVoiceConnection(guildId);
        if (connection) {
            connection.destroy();
        }
        this.clearQueue(guildId);
    }

    async setVolume(guildId, volumeLevel) {
        // Volume control implementation can be integrated here
        // Depending on audio player setup and global volume management strategies
    }

    async pauseMusic(guildId) {
        const connection = getVoiceConnection(guildId);
        if (connection) {
            const player = connection.state.subscription.player;
            if (player) {
                player.pause();
                return true;
            }
        }
        return false;
    }

    async resumeMusic(guildId) {
        const connection = getVoiceConnection(guildId);
        if (connection) {
            const player = connection.state.subscription.player;
            if (player) {
                player.unpause();
                return true;
            }
        }
        return false;
    }

    async skipTrack(guildId) {
        const connection = getVoiceConnection(guildId);
        if (connection) {
            const player = connection.state.subscription.player;
            if (player) {
                player.stop();
            }
        }
    }
}

module.exports = new QueueService();