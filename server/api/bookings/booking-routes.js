
const express = require('express');
const bookingRouter = express.Router();
const Boat = require('../boats/Boat.model');
const User = require('../auth/User.model');
const Booking = require('../bookings/Booking.model');
const sendConfirmationMail = require ('../../mail/sendConfirmation');
const sendConfirmationResponseMail = require ('../../mail/sendConfirmationResponse');


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
      sendConfirmationMail(updatedBoat.owner.email, {
        userName: updatedBoat.owner.name, 
        userSurname: updatedBoat.owner.surname,
        boatName: updatedBoat.name,
        startDate: `${newBooking.startDate.getDate()}/${newBooking.startDate.getMonth()+1}/${newBooking.startDate.getFullYear()}`,
        endDate: `${newBooking.endDate.getDate()}/${newBooking.endDate.getMonth()+1}/${newBooking.endDate.getFullYear()}`,
        BASEURL: process.env.BASEURL,
        bookingId: newBooking._id
      });
    })
    .catch((e)=>console.log("error", e))
  })
  .catch(e => next(e));
});

bookingRouter.get('/confirm/:id', (req, res, next) => {
  Booking.findByIdAndUpdate(req.params.id, {confirmed: true}).populate('user').populate('boat')
  .then((updatedBooking)=>{
    sendConfirmationResponseMail(updatedBooking.user.email, {
      userName: updatedBooking.user.name, 
      userSurname: updatedBooking.user.surname,
      boatName: updatedBooking.boat.name,
      startDate: `${updatedBooking.startDate.getDate()}/
                  ${updatedBooking.startDate.getMonth()+1}/
                  ${updatedBooking.startDate.getFullYear()}`,
      endDate: `${updatedBooking.endDate.getDate()}/
                ${updatedBooking.endDate.getMonth()+1}/
                ${updatedBooking.endDate.getFullYear()}`,
      // BASEURL: process.env.BASEURL,
      bookingId: updatedBooking._id
    });
  })
  .catch((e)=>console.log("error", e))
  res.render('confirmBooking')
})
module.exports = bookingRouter;