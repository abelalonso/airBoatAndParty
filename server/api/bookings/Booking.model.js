const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bookingSchema = new Schema({
  startDate: Date,
  endDate: Date,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  boat: {type: Schema.Types.ObjectId, ref: 'Boat'},
  confirmed: Boolean,
  totalPrice: Number,
  use: String,
  shoppingCart: String,
  isActive: {type: Boolean, default: true}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;