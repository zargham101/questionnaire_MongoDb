const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const responseSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questionnaire: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questionnaire'
    }],
    answers: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Response', responseSchema)