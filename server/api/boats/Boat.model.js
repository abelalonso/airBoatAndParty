const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  Name: {type: String, required: true},
  capacity: Number,
  crew: Number,
  dimensions: String,
  booked: [Date],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  pricePerDay: Number,
  photos: [String],
  position: {
    longitude: Number,
    latitude: Number
  },
  city: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;