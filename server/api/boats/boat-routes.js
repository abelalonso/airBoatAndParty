const express = require('express');
const boatRouter  = express.Router();
const Boat = require('./Boat.model');
const User = require('../auth/User.model');

/* GET home page */

boatRouter.get('/', (req, res, next) => {
    Boat.find()
    .then( objList => res.status(200).json(objList))
    .catch(e => next(e))
});

boatRouter.post('/', (req, res, next) => {
    const {name, capacity, crew, dimensions, owner, pricePerDay, position, city} = req.body;

    //Create the boat
    newBoat = new Boat({
        name, capacity, crew, dimensions, owner, pricePerDay, position, city,
        photos: [],
        booked: []
    }).save()
    .then ( savedBoat => {
        console.log(savedBoat)
        User.findByIdAndUpdate(owner, { $push: {boats: savedBoat._id}}).then(udatedUser => {
            console.log(udatedUser)
            res.json({status: `Boat ${name} registered succesfully`})})
        })
    .catch(e => next(e));
})

module.exports = boatRouter;
