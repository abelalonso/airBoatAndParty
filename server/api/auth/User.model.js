const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  role: { 
    type: String, 
    enum: ["Administrador", "Usuario", "Propietario"],
    default: "user"
  },
  email: {type: String, required: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  boats: {type: [Schema.Types.ObjectId], ref: 'Boat'},
  bookings: {type: [Schema.Types.ObjectId], ref: 'Booking'},
  profileImage: {type: String, default: "https://res-console.cloudinary.com/abel-alonso/thumbnails/v1/image/upload/v1533033981/YWlyQnlQL2Fub25pbW8=/grid"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;