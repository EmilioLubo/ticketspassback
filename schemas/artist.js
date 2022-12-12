const joi = require('joi')

const schema = joi.object({
    name:joi
        .string()
        .required()
        .min(3)
        .max(50)
        .messages({
            "string.required": "the field is required, please enter your name",
            "string.empty": "you can't leave this field empty",
            "string.min": "Your name must have at least 3 character",
            "string.max": "Your name must have a maximum of 50 characters",
            "string.base": "only letters and numbers are valid"
        }),
    photo:joi
        .string()
        .required()
        .uri()
        .messages({
            "string.required": "the field is required, please enter your photo",
            "string.uri": "photo field must be a valid url",
            "string.empty": "you can't leave this field empty",
            "string.base": "only letters and numbers are valid"
        }),
    genre:joi.
        string()
        .required()
        .valid('Blues', 'Country', 'Electronic', 'Hip hop', 'Jazz', 'Latin', 'Pop', 'R&B and Soul', 'Rap', 'Reggae', 'Rock', 'Trap')
        .insensitive()
        .messages({
            "string.required": "the field is required, please enter a genre",
            "string.valid": "invalid genre name",
            "string.empty": "you can't leave this field empty",
            "string.base": "only letters and numbers are valid"
        }),
    description:joi
        .string()
        .required()
        .min(10)
        .max(300)
        .messages({
            "string.required": "the field is required, please enter a description",
            "string.empty": "you can't leave this field empty",
            "string.min": "description must have at least 10 character",
            "string.max": "description must have a maximum of 300 characters",
            "string.base": "only letters and numbers are valid"
        }),
    youtubeVideo:joi
        .string()
        .uri()
        .messages({
            "string.uri": "youtube video field must be a valid url",
            "string.empty": "you can't leave this field empty",
            "string.base": "only letters and numbers are valid"
        }),
    youtubeChannel:joi
        .string()
        .uri()
        .messages({
            "string.uri": "youtube channel field must be a valid url",
            "string.empty": "you can't leave this field empty",
            "string.base": "only letters and numbers are valid"
        }),
    spotifyPlaylist:joi
        .string()
        .uri()
        .messages({
            "string.uri": "spotify playlist field must be a valid url",
            "string.empty": "you can't leave this field empty",
            "string.base": "only letters and numbers are valid"
        }),
})

module.exports = schema