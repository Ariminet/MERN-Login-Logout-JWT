const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.Now,
  },
});

module.exports = Application = mongoose.model('application', ApplicationSchema);
