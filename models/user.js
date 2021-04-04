const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//for schema validation
const Joi = require('joi');
const Review = require('./review');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    job_title: {
        type: String,
    },
    name: {
        first: {
            type: String,
        },
        last: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

//Deletes any reviews leading to a mentor which no longer exists
UserSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

//automatically creates a username and password key inside the user schema
//refer to passport-local-mongoose docs for information 
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema);

