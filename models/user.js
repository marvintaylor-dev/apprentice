const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//for schema validation
const Joi = require('joi')


const userSchema = ({
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
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: String,
    },
    tier: {
        type: String,
        enum: ['1', '2', '3']
    },
    salary: {
        type: String,
    },
    location: {
        city: {
            type: String
        },
        state: {
            type: String,
            enum: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
                'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
                'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
                'Wisconsin', 'Wyoming']
        },
        zip: {
            type: Number
        }
    },
    job_description: {
        type: String
    },
    education_required: {
        type: String
    },
    field_of_study: {
        type: String,
        enum: ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business']
    }
})

const Mentor = mongoose.model('Mentor', mentorSchema)

module.exports = User;
module.exports = Mentor;