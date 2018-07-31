const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  date: Date,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  confirmed: Boolean,
  totalPrice: Number,
  use: String,
  shopingCart: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;