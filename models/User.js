const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// Condensed down by destructuring using
const { Schema } = mongoose;

// Creating a schema for mongoose
const userSchema = new mongoose.Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  displayName: String,
});

// Telling mongoose to use userSchema modle instance for users collection
// Load the userSchema into mongoose
mongoose.model('users', userSchema);

// mongoose.model();
// One argument inside the above statement means we are pulling sth out of mongoose.
// Two argument means we are loading sth into mongoose.
