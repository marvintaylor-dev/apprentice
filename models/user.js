const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//for schema validation
const Joi = require('joi');
const passportLocalMongoose = require('passport-local-mongoose');



const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//automatically creates a username and password key inside the user schema
//refer to passport-local-mongoose docs for information 
UserSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model('User', UserSchema)


