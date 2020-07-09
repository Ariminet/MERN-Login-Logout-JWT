const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  Proffesion: {
    type: String,
  },
  Skills: {
    type: String,
  },
  about: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.Now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
