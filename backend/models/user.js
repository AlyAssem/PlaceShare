const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },

  // ref property establishes a connection between this schema and placeSchema.
  // an array here cuz 1 user has many places while 1 place has only 1 user.
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }], //telling mongoose this is an id.
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
