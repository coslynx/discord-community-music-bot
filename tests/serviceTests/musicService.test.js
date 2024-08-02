const musicService = require('../../services/musicService');

describe('MusicService', () => {
    let guildId;

    beforeEach(() => {
        guildId = 'mockGuildId';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add a song to the queue', async () => {
        const song = { title: 'Test Song', url: 'http://youtube.com/test', requestedBy: 'User' };
        
        await musicService.addToQueue(guildId, song);
        const queue = await musicService.getQueue(guildId);
        
        expect(queue).toContainEqual(song);
    });

    test('should play the next song in the queue', async () => {
        const song1 = { title: 'Test Song 1', url: 'http://youtube.com/test1', requestedBy: 'User1' };
        const song2 = { title: 'Test Song 2', url: 'http://youtube.com/test2', requestedBy: 'User2' };

        await musicService.addToQueue(guildId, song1);
        await musicService.addToQueue(guildId, song2);
        
        await musicService.playNext(guildId, { join: jest.fn(() => { return { destroy: jest.fn() }; }) });
        const currentlyPlaying = await musicService.getCurrentlyPlaying(guildId);
        
        expect(currentlyPlaying).toBe(song1.title);
    });

    test('should skip the current track', async () => {
        const song1 = { title: 'Test Song 1', url: 'http://youtube.com/test1', requestedBy: 'User1' };
        const song2 = { title: 'Test Song 2', url: 'http://youtube.com/test2', requestedBy: 'User2' };

        await musicService.addToQueue(guildId, song1);
        await musicService.addToQueue(guildId, song2);
        
        await musicService.skipTrack(guildId);
        const queue = await musicService.getQueue(guildId);

        expect(queue).not.toContain(song1);
        expect(queue).toContain(song2);
    });

    test('should stop music and clear the queue', async () => {
        const song = { title: 'Test Song', url: 'http://youtube.com/test', requestedBy: 'User' };

        await musicService.addToQueue(guildId, song);
        await musicService.stopMusic(guildId);

        const queue = await musicService.getQueue(guildId);
        const currentlyPlaying = await musicService.getCurrentlyPlaying(guildId);

        expect(queue).toHaveLength(0);
        expect(currentlyPlaying).toBeNull();
    });

    test('should handle errors when adding to the queue', async () => {
        jest.spyOn(musicService, 'addToQueue').mockImplementation(() => {
            throw new Error('Test error');
        });

        await expect(musicService.addToQueue(guildId, { title: 'Test Song' })).rejects.toThrow('Test error');
    });

    test('should correctly pause and resume music', async () => {
        const song = { title: 'Test Song', url: 'http://youtube.com/test', requestedBy: 'User' };

        await musicService.addToQueue(guildId, song);
        await musicService.playNext(guildId, { join: jest.fn(() => { return { destroy: jest.fn() }; }) });

        await musicService.pauseMusic(guildId);
        const isPaused = await musicService.pauseMusic(guildId);
        
        expect(isPaused).toBe(true);

        await musicService.resumeMusic(guildId);
        const currentlyPlaying = await musicService.getCurrentlyPlaying(guildId);
        
        expect(currentlyPlaying).toBe(song.title);
    });
});