const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3050;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, () => {
  console.log(`Server established ${PORT}`);
});

connectDB();

// Create URL History by pushing HTML file for JS execution to user requesting data from URL
// PATH is required for this to work!
// app.get('*', function (req, res) {
//   var path = require('path');
//   var filePath = './client/build/index.html';
//   var resolvedPath = path.resolve(filePath);
//   console.log(resolvedPath);
//   return res.sendFile(resolvedPath);
// });

app.use('/api/users', require('./routes/userRouter'));
