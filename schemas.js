const BaseJoi = require("joi");
// protect against HTML being used in inputs
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.userSchema = Joi.object().keys({
  job_title: Joi.string().escapeHTML().label("Job Title").allow("").optional(),
  name: Joi.object({
    first: Joi.string().escapeHTML(),
    last: Joi.string().escapeHTML(),
  }),
  email: Joi.string()
    .escapeHTML()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .label("Username")
    .required()
    .escapeHTML(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .escapeHTML(),
  age: Joi.number().min(0).allow("").optional(),
  //profile_pic: Joi.any(),
  path: Joi.string().escapeHTML(),
  tier: Joi.string().allow("").optional().escapeHTML(),
  salary: Joi.string().allow("").optional(),
  location: Joi.object({
    city: Joi.string().allow("").optional().escapeHTML(),
    state: Joi.string().allow("").optional().escapeHTML(),
    zip: Joi.number().allow("").optional(),
  }),
  job_description: Joi.string()
    .allow("")
    .optional()
    .escapeHTML()
    .label("Job Description"),
  education_required: Joi.any()
    .allow("")
    .optional()
    .label("Education Required"),
  field_of_study: Joi.string()
    .allow("")
    .optional()
    .label("Field of Study")
    .escapeHTML(),
  deleteImage: Joi.string().escapeHTML(),
});

module.exports.reviewSchema = Joi.object({
  score: Joi.number(),
  body: Joi.string().escapeHTML(),
}).required();

module.exports.noteSchema = Joi.object({
  noteBody: Joi.string().escapeHTML(),
});
