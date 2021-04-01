const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//for schema validation
const Joi = require('joi');

const reviewSchema = new Schema({
    score: Number,
    body: String
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review