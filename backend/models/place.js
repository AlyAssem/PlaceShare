const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  // ref property establishes a connection between this schema and userSchema.
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, //telling mongoose this is an id.
});

module.exports = mongoose.model('Place', placeSchema);
