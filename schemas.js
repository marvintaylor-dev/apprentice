const Joi = require('joi');

module.exports.mentorSchema = Joi.object({
    job_title: Joi.string()
        .label('Job Title'),
    name: Joi.object({
        first: Joi.string(),
        last: Joi.string(),
    }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .label('Username'),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    age: Joi.number()
        .min(0),
    profile_pic: Joi.any(),
    tier: Joi.string(),
    salary: Joi.string(),
    location: Joi.object({
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.number()
    }),
    job_description: Joi.string()
        .label('Job Description'),
    education_required: Joi.any()
        .label('Education Required'),
    field_of_study: Joi.string()
        .label('Field of Study')
})

module.exports.reviewSchema = Joi.object({
    score: Joi.number(),
    body: Joi.string()
}).required()