const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Questionnaire = new Schema({
    text: [{
        type: String
    }],
    options: [{
        type: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Questionnaire', Questionnaire);