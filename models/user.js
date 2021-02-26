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
        type: String,
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

const User = mongoose.model('User', userSchema)


const mentorSchema = new Schema({
    job_title: {
        type: String,
        required: true
    },
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
    salary: {
        type: String,
    },
    job_description: {
        type: String
    },
    education_required: {
        type: String
    },
    field_of_study: {
        type: String
    }
})

const Mentor = mongoose.model('Mentor', mentorSchema)

module.exports = User;
module.exports = Mentor;