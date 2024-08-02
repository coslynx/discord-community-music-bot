const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: String, // Using String for user ID (Discord Snowflake)
        required: true,
    },
    preferences: {
        type: Object,
        default: {}, // Default to empty object
    },
    history: {
        type: [String],
        default: [], // Store historical song IDs or titles
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Method to create a new user
userSchema.statics.createUser = async function(userId) {
    const user = new this({ _id: userId, preferences: {} });
    try {
        await user.save();
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Could not create user. Please try again later.');
    }
};

// Method to retrieve a user by ID
userSchema.statics.getUserById = async function(userId) {
    try {
        const user = await this.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw new Error('Could not retrieve user. Please try again later.');
    }
};

// Method to update user preferences
userSchema.statics.updateUserPreferences = async function(userId, preferences) {
    try {
        const user = await this.findByIdAndUpdate(userId, { preferences }, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user.preferences;
    } catch (error) {
        console.error('Error updating user preferences:', error);
        throw new Error('Could not update user preferences. Please try again later.');
    }
};

// Method to add a song to the user's history
userSchema.statics.addSongToHistory = async function(userId, songId) {
    try {
        const user = await this.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.history.push(songId);
        await user.save();
        return user.history;
    } catch (error) {
        console.error('Error adding song to history:', error);
        throw new Error('Could not add song to history. Please try again later.');
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;