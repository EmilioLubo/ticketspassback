const joi = require('joi')

const schema = joi.object({
    name:joi.string().min(3).max(50),
    photo:joi.string().uri(),
    genre:joi.string().min(3),
    description:joi.string().min(5).max(300),
    youtubeVideo:joi.string().uri(),
    youtubeChannel:joi.string().uri(),
    spotifyPlaylist:joi.string().uri(),
})

module.exports = schema