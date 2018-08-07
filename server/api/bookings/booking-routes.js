
const express = require('express');
const bookingRouter = express.Router();
const Boat = require('../boats/Boat.model');
const User = require('../auth/User.model');
const Booking = require('../bookings/Booking.model');
const transporter = require ('../../config/nodemailer');



function updateBookinsState(){
  Booking.findOneAndUpdate({endDate: {$lte: new Date()}}, {isActive: false})
  .then(()=>{
    console.log("actualizadas las reservas")
  })
  .catch(()=>exit=true)

}
bookingRouter.get('/user/:id', (req, res, next) => {
  //update the state of the bookings on every get
 updateBookinsState()
  Booking.find({'user': req.params.id}).populate('boat')
  .then( objList => res.status(200).json(objList))
  .catch(e => next(e))
});

bookingRouter.get('/boat/:id', (req, res, next) => {
  updateBookinsState()
  Booking.find({'boat': req.params.id})
  .then( objList => res.status(200).json(objList))
  .catch(e => next(e))
});

bookingRouter.get('/:id', (req, res, next) => {
  updateBookinsState()
  Booking.findById(req.params.id).populate('boat')
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

  newBooking.save()
  //Update the user bookings array
  .then ( () => {
    User.findByIdAndUpdate(newBooking.user, {$push: {bookings: newBooking._id}},{new:true})
      .then((updatedUser) => {
        console.log(`User ${updatedUser.username} updated succesfully`)})
      .catch((e)=>console.log("error", e))
  })
    //update the boat booked array
  .then ( () => {
    Boat.findByIdAndUpdate(req.params.id, {$push: {bookings: newBooking._id}}, {new: true}).populate('owner')
    .then((updatedBoat) => {
      res.json({status: `Booking ${newBooking._id} registered succesfully`})
      transporter.sendMail({
        to: updatedBoat.owner.email,
        subject: 'Nueva Reserva en uno de tus barcos',
        html: `<p>Hola ${updatedBoat.owner.name} ${updatedBoat.owner.surname}
        Confirma la reserva  <a href="${process.env.BASEURL}/api/booking/confirm/${newBooking._id}">aqui</a>.</p>`
      })
    })
    .catch((e)=>console.log("error", e))
  })
  .catch(e => next(e));
});

bookingRouter.get('/confirm/:id', (req, res, next) => {
  Booking.findByIdAndUpdate(req.params.id, {confirmed: true}).populate('user')
  .then((updatedBooking)=>{
    transporter.sendMail({
      to: updatedBooking.user.email,
      subject: 'Confirmación de Reserva',
      html: `<p>Hola ${updatedBooking.user.name} ${updatedBooking.user.surname}
      Tu reserva para el barco ha sido confirmada.</p>`
    })
  })
  res.render('confirmBooking')
})
module.exports = bookingRouter;