const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    requestedBy: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    platform: {
        type: String,
        enum: ['YouTube', 'Spotify'],
        required: true
    },
}, {
    timestamps: true
});

songSchema.statics.createSong = async function(songData) {
    try {
        const song = new this(songData);
        return await song.save();
    } catch (error) {
        throw new Error('Error saving song: ' + error.message);
    }
};

songSchema.statics.findByTitle = async function(title) {
    try {
        return await this.findOne({ title });
    } catch (error) {
        throw new Error('Error finding song: ' + error.message);
    }
};

songSchema.statics.findAll = async function() {
    try {
        return await this.find({});
    } catch (error) {
        throw new Error('Error retrieving songs: ' + error.message);
    }
};

songSchema.statics.deleteById = async function(id) {
    try {
        return await this.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting song: ' + error.message);
    }
};

const Song = mongoose.model('Song', songSchema);

module.exports = Song;