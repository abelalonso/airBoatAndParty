const express = require('express');
const bookingRouter = express.Router();
const Boat = require('../boats/Boat.model');
const User = require('../auth/User.model');
const Booking = require('../bookings/Booking.model');

bookingRouter.get('/user/:id', (req, res, next) => {
  //We should update the state of the bookings on every get
  Booking.find({'user': req.params.id})
  .then( objList => res.status(200).json(objList))
  .catch(e => next(e))
});

bookingRouter.get('/boat/:id', (req, res, next) => {
  //We should update the state of the bookings on every get
  Booking.find({'boat': req.params.id})
  .then( objList => res.status(200).json(objList))
  .catch(e => next(e))
});

bookingRouter.post('/boat/:id', (req, res, next) => {

  const {startDate, endDate, use, shoppingCard, user, totalPrice} = req.body;

  //Create the booking
  const newBooking = new Booking({
    startDate, endDate, totalPrice, use, shoppingCard, user,
    boat: req.params.id,
  });

  console.log("Nueva reserva", newBooking)

  newBooking.save()
  //Update the user bookings array
  .then ( () => {
    console.log("user",newBooking.user, newBooking._id)
    User.findByIdAndUpdate(newBooking.user, {$push: {bookings: newBooking._id}},{new:true})
      .then((updatedUser) => console.log(`User ${updatedUser.username} updated succesfully`))
      .catch((e)=>console.log("error", e))
  })
    //update the boat booked array
  .then ( () => {
    Boat.findByIdAndUpdate(req.params.id, {$push: {bookings: newBooking._id}}, {new: true})
    .then((updatedBoat) => {
      res.json({status: `Booking ${newBooking._id} registered succesfully`})
    })
  })
  .catch(e => next(e));
});


module.exports = bookingRouter;