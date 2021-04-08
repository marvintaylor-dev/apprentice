const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//for schema validation
const Joi = require('joi');

const reviewSchema = new Schema({
    score: Number,
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Review', reviewSchema)
