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
    genre:joi
        .array()
        .min(1)
        .required()
        .items(
            joi
            .string()
            .required()
            .valid('Ambient', 'Blues', 'Country', 'Electronic', 'Funk','Hip-hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'R&B and Soul', 'Rap', 'Reggae', 'Reggaeton', 'Rock', 'Ska', 'Trap')
            .insensitive()
            .messages({
                "string.required": "the field is required, please enter a genre",
                "string.valid": "invalid genre name",
                "string.empty": "you can't leave this field empty",
                "string.base": "only letters and numbers are valid"
            }),
        )
        .messages({
            "array.required": "the field is required, please choose at least one genre",
            "array.min": "you must choose at least one valid genre"
        }),
    description:joi
        .string()
        .required()
        .min(10)
        .max(600)
        .messages({
            "string.required": "the field is required, please enter a description",
            "string.empty": "you can't leave this field empty",
            "string.min": "description must have at least 10 character",
            "string.max": "description must have a maximum of 600 characters",
            "string.base": "only letters and numbers are valid"
        }),
    youtubeVideo:joi
        .string()
        .uri()
        .allow('')
        .messages({
            "string.uri": "youtube video field must be a valid url",
        }),
    youtubeChannel:joi
        .string()
        .uri()
        .allow('')
        .messages({
            "string.uri": "youtube channel field must be a valid url",
        }),
    spotifyPlaylist:joi
        .string()
        .uri()
        .allow('')
        .messages({
            "string.uri": "spotify playlist field must be a valid url",
        }),
})

module.exports = schema