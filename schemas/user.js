const joi = require(`joi`)

const schema = joi.object({
    name: joi
        .string()
        .required()
        .min(3)
        .max(30)
        .messages({
            "string.required": "the field is required, please enter your name",
            "string.empty": "you can't leave the name field empty",
            "string.min": "Your name must have at least 3 character",
            "string.max": "Your name must have a maximum of 50 characters",
            "string.base": "only letters and numbers are valid"
        }),
    lastName: joi
        .string()
        .required()
        .min(3)
        .max(30)
        .messages({
            "string.required": "the field is required, please enter your last name",
            "string.empty": "you can't leave the lastName field empty",
            "string.min": "Your last name must have at least 3 character",
            "string.max": "Your last name must have a maximum of 50 characters",
            "string.base": "only letters and numbers are valid"
        }),
    photo: joi
        .string()
        .required()
        .messages({
            "string.required": "the field is required, please enter your photo",
            "string.empty": "you can't leave the photo field empty",
            "string.base": "only letters and numbers are valid"
        }),
    birthDate: joi
        .date()
        .required()
        .messages({
            "date.required": "the field is required, please enter your birth date",
            "date.empty": "you can't leave the birthDate field empty",
            "date.base": "only letters and numbers are valid"
        }),
    email: joi
        .string()
        .required()
        .email()
        .messages({
            "string.required": "the field is required, please enter your email",
            "string.empty": "you can't leave the email field empty",
            "string.email": "please enter a valid email",
            "string.base": "only letters and numbers are valid"
        }),
    password: joi
        .string()
        .required()
        .min(4)
        .max(30)
        .messages({
            "string.required": "the field is required, please enter your password",
            "string.empty": "you can't leave the password field empty",
            "string.min": "Your password must have at least 4 character",
            "string.max": "Your password must have a maximum of 30 characters",
            "string.base": "only letters and numbers are valid"
        }),
})

module.exports=schema;