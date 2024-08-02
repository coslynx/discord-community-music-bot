const userService = require('../../services/userService');

describe('UserService', () => {
    let mockUserId;

    beforeEach(() => {
        mockUserId = '1234567890';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new user', async () => {
        const result = await userService.createUser(mockUserId);
        expect(result).toHaveProperty('_id', mockUserId);
        expect(result).toHaveProperty('preferences', {});
    });

    test('should retrieve a user by ID', async () => {
        await userService.createUser(mockUserId);
        const user = await userService.getUser(mockUserId);
        expect(user).toHaveProperty('_id', mockUserId);
    });

    test('should throw an error if the user is not found', async () => {
        await expect(userService.getUser('nonexistentId')).rejects.toThrow('User not found');
    });

    test('should update user preferences', async () => {
        await userService.createUser(mockUserId);
        const preferences = { theme: 'dark' };
        const updatedPreferences = await userService.updateUserPreferences(mockUserId, preferences);
        expect(updatedPreferences).toEqual(preferences);
    });

    test('should throw an error when updating preferences for a non-existent user', async () => {
        const preferences = { theme: 'dark' };
        await expect(userService.updateUserPreferences('nonexistentId', preferences)).rejects.toThrow('User not found');
    });

    test('should get user preferences successfully', async () => {
        await userService.createUser(mockUserId);
        const preferences = { theme: 'dark' };
        await userService.updateUserPreferences(mockUserId, preferences);
        const result = await userService.getUserPreferences(mockUserId);
        expect(result).toEqual(preferences);
    });

    test('should throw an error when retrieving preferences for a non-existent user', async () => {
        await expect(userService.getUserPreferences('nonexistentId')).rejects.toThrow('Could not retrieve user preferences. Please try again later.');
    });

    test('should save user preferences', async () => {
        await userService.createUser(mockUserId);
        const preferences = { theme: 'dark' };
        await userService.saveUserPreferences(mockUserId, preferences);
        const user = await userService.getUser(mockUserId);
        expect(user.preferences).toEqual(preferences);
    });

    test('should throw an error when saving preferences for a non-existent user', async () => {
        const preferences = { theme: 'dark' };
        await expect(userService.saveUserPreferences('nonexistentId', preferences)).rejects.toThrow('Could not save user preferences. Please try again later.');
    });
});