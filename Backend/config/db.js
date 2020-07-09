const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MongoDB_URI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connection was established');
  } catch (err) {
    console.log({ error: err.message });
  }
};

module.exports = connectDB;
