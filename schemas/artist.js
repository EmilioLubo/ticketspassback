const joi = require('joi')

const schema = joi.object({
    name:joi.string().required().min(3).max(50),
    photo:joi.string().required().uri(),
    genre:joi.string().required().min(3),
    description:joi.string().required().min(5).max(300),
    youtubeVideo:joi.string().required().uri(),
    youtubeChannel:joi.string().required().uri(),
    spotifyPlaylist:joi.string().required().uri(),
})

module.exports = schema