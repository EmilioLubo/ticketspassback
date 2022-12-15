const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  photo: {type: String, required: true},
  genre: [{type: String, required: true}],
  description: {type: String, required: true},
  youtubeVideo: {type: String},
  youtubeChannel: {type: String},
  spotifyPlaylist: {type: String},
});

const Artist = mongoose.model('artists', schema);
module.exports = Artist;  