const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//for schema validation
const Joi = require('joi');
const Review = require('./review');
const passportLocalMongoose = require('passport-local-mongoose');

const opts = { toJSON: { virtuals: true } };

const UserSchema = new Schema({
    avatar: {
        url: String,
        filename: String
    },
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
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
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
    author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    path: {
        type: String,
        enum: ['Mentor', 'Mentee']
    },
    mentees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, opts)

UserSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/explore/${this._id}">${this.username}</a></strong>
    <p>${this.job_title}</p>`
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

