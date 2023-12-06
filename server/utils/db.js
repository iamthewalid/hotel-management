const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;

connection.on('error', () => {
  console.log('MongoDB connection failed');
});

connection.on('connected', () => {
  console.log('MongoDB connection successfull!');
});

module.exports = mongoose;
