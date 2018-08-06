const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Station = require('../meteo/station.model')

const boatSchema = new Schema({
  name: {type: String, required: true},
  capacity: Number,
  patron: Boolean,
  crew: Number,
  bookings: [{type: [Schema.Types.ObjectId], ref: 'Booking'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  pricePerDay: Number,
  photos: [String],
  description: String,
  station: {type: Schema.Types.ObjectId, ref: 'Station'},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Boat = mongoose.model('Boat', boatSchema);
module.exports = Boat;