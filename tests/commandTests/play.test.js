const { MessageEmbed } = require('discord.js');
const musicService = require('../../services/musicService');
const playCommand = require('../../commands/play');

describe('Play Command', () => {
    let mockMessage;

    beforeEach(() => {
        mockMessage = {
            member: {
                voice: {
                    channel: {
                        id: 'mockChannelId',
                        guild: {
                            id: 'mockGuildId',
                        },
                        join: jest.fn()
                    }
                }
            },
            channel: {
                send: jest.fn()
            },
            author: { 
                username: 'TestUser' 
            },
            content: ''
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should send a message if there is no voice channel', async () => {
        mockMessage.member.voice.channel = null;

        await playCommand.execute(mockMessage, ['test song']);

        expect(mockMessage.channel.send).toHaveBeenCalledWith('You need to be in a voice channel to play music!');
    });

    test('should send a message if no song query is provided', async () => {
        await playCommand.execute(mockMessage, []);

        expect(mockMessage.channel.send).toHaveBeenCalledWith('Please provide the name or link of a song to play!');
    });

    test('should send a message if no results are found for a song query', async () => {
        mockMessage.member.voice.channel = { id: 'mockChannelId', guild: { id: 'mockGuildId' } };
        jest.spyOn(musicService, 'addToQueue').mockImplementation(() => Promise.reject(new Error('No results found')));

        await playCommand.execute(mockMessage, ['nonexistent song']);

        expect(mockMessage.channel.send).toHaveBeenCalledWith('No results found for your query. Please try again.');
    });

    test('should correctly add a song to the queue when a valid song link is provided', async () => {
        const mockSongInfo = {
            title: 'Test Song',
            video_url: 'http://youtube.com/test',
        };

        mockMessage.member.voice.channel = { id: 'mockChannelId', guild: { id: 'mockGuildId' } };
        jest.spyOn(musicService, 'addToQueue').mockResolvedValue();

        jest.spyOn(musicService, 'playNext').mockResolvedValue();
        jest.spyOn(musicService, 'getQueue').mockResolvedValue([]);

        await playCommand.execute(mockMessage, ['http://youtube.com/test']);

        expect(mockMessage.channel.send).toHaveBeenCalledWith(expect.objectContaining({
            embeds: expect.arrayContaining([
                expect.objectContaining({
                    title: 'Song Added to Queue',
                    description: expect.stringContaining('Added Test Song to the queue.')
                })
            ])
        }));

        expect(musicService.addToQueue).toHaveBeenCalledWith(mockMessage.guild.id, expect.objectContaining({
            title: mockSongInfo.title,
            url: mockSongInfo.video_url,
            requestedBy: mockMessage.author.username,
        }));
    });

    test('should play next song if the queue was previously empty', async () => {
        const mockSongInfo = {
            title: 'Test Song',
            video_url: 'http://youtube.com/test',
        };

        mockMessage.member.voice.channel = { id: 'mockChannelId', guild: { id: 'mockGuildId' } };
        jest.spyOn(musicService, 'addToQueue').mockResolvedValue();
        jest.spyOn(musicService, 'getQueue').mockResolvedValue([]);
        jest.spyOn(musicService, 'playNext').mockResolvedValue();

        await playCommand.execute(mockMessage, ['http://youtube.com/test']);

        expect(musicService.playNext).toHaveBeenCalledWith(mockMessage.guild.id, mockMessage.member.voice.channel);
    });

    test('should handle errors when attempting to play a song', async () => {
        mockMessage.member.voice.channel = { id: 'mockChannelId', guild: { id: 'mockGuildId' } };
        const errorMessage = 'Playback error';

        jest.spyOn(musicService, 'addToQueue').mockRejectedValue(new Error(errorMessage));

        await playCommand.execute(mockMessage, ['test song']);

        expect(mockMessage.channel.send).toHaveBeenCalledWith('An error occurred while trying to play the song. Please try again later.');
    });
});