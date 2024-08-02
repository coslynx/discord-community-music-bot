const axios = require('axios');
const { Song } = require('../models/song');
const { User } = require('../models/user');

class ApiService {
    constructor() {
        this.spotifyBaseURL = 'https://api.spotify.com/v1';
        this.lastFmBaseURL = 'http://ws.audioscrobbler.com/2.0/';
    }

    async searchSong(platform, query) {
        try {
            if (platform === 'spotify') {
                const response = await axios.get(`${this.spotifyBaseURL}/search`, {
                    params: {
                        q: query,
                        type: 'track',
                        limit: 5
                    },
                    headers: {
                        'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
                    }
                });

                return response.data.tracks.items.map(track => ({
                    title: track.name,
                    artist: track.artists[0].name,
                    url: track.external_urls.spotify,
                }));
            } else if (platform === 'lastfm') {
                const response = await axios.get(this.lastFmBaseURL, {
                    params: {
                        method: 'track.search',
                        track: query,
                        api_key: process.env.LASTFM_API_KEY,
                        format: 'json'
                    }
                });

                return response.data.results.trackmatches.track.map(track => ({
                    title: track.name,
                    artist: track.artist,
                    url: track.url,
                }));
            }
        } catch (error) {
            console.error('Error searching song:', error);
            throw new Error('Could not search for the song. Please try again later.');
        }
    }

    async saveSongToDatabase(songData) {
        try {
            const song = new Song(songData);
            await song.save();
            return song;
        } catch (error) {
            console.error('Error saving song to database:', error);
            throw new Error('Could not save song. Please try again later.');
        }
    }

    async getUserPreferences(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) throw new Error('User not found');
            return user.preferences;
        } catch (error) {
            console.error('Error retrieving user preferences:', error);
            throw new Error('Could not retrieve user preferences. Please try again later.');
        }
    }

    async updateUserPreferences(userId, preferences) {
        try {
            const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true });
            if (!user) throw new Error('User not found');
            return user.preferences;
        } catch (error) {
            console.error('Error updating user preferences:', error);
            throw new Error('Could not update user preferences. Please try again later.');
        }
    }
}

module.exports = new ApiService();