const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    interest: {
        type: String,
        required: true,
    },
    starting: {
        type: Number,
        required: true,
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: Number,
            required: true
        }
    }
})

module.exports = mongoose.model('User', userSchema)