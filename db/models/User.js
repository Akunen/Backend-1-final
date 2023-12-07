const mongoose = require('mongoose');

//Mongoose skeema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  isadmin: {
    type: Boolean,
    required: true,
  },
});

//Mongoose model
const User = mongoose.model('User', userSchema);

//Exportataan model
module.exports = User;
