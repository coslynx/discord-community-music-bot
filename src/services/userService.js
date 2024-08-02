const { User } = require('../models/user');

class UserService {
    async createUser(userId) {
        const user = new User({ _id: userId, preferences: {} });
        try {
            await user.save();
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Could not create user. Please try again later.');
        }
    }

    async getUser(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error retrieving user:', error);
            throw new Error('Could not retrieve user. Please try again later.');
        }
    }

    async updateUserPreferences(userId, preferences) {
        try {
            const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user.preferences;
        } catch (error) {
            console.error('Error updating user preferences:', error);
            throw new Error('Could not update user preferences. Please try again later.');
        }
    }

    async getUserPreferences(userId) {
        try {
            const user = await this.getUser(userId);
            return user.preferences;
        } catch (error) {
            console.error('Error getting user preferences:', error);
            throw new Error('Could not retrieve user preferences. Please try again later.');
        }
    }

    async saveUserPreferences(userId, preferences) {
        try {
            const user = await this.updateUserPreferences(userId, preferences);
            return user;
        } catch (error) {
            console.error('Error saving user preferences:', error);
            throw new Error('Could not save user preferences. Please try again later.');
        }
    }
}

module.exports = new UserService();