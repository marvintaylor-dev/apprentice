const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//for schema validation
const Joi = require('joi');



const noteSchema = new Schema({
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        writeConcern: {
            w: 'majority',
            j: true,
            wtimeout: 1000
        }
    })


module.exports = mongoose.model('Note', noteSchema)