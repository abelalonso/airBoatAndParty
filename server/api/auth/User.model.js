const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  role: { 
    type: String, 
    enum: ["admin", "user", "owner"],
    default: "user"
  },
  email: {type: String, required: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  boats: {type: [Schema.Types.ObjectId], ref: 'Boat'},
  profileImage: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;