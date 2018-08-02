const express = require('express');
const boatRouter = express.Router();
const Boat = require('./Boat.model');
const User = require('../auth/User.model');

/* GET home page */

boatRouter.get('/', (req, res, next) => {
    Boat.find().populate('owner')
    .then( objList => res.status(200).json(objList))
    .catch(e => next(e))
});

boatRouter.get('/:id', (req, res, next) => {
    Boat.find({owner: req.params.id}).populate('owner')
    .then( objList => res.status(200).json(objList))
    .catch(e => next(e))
});


boatRouter.post('/', (req, res, next) => {
    const {name, capacity, crew, dimensions, owner, pricePerDay, position, city} = req.body;

    //Create the boat
    newBoat = new Boat({
        name, capacity, crew, dimensions, owner, pricePerDay, position, city,
        photos: [],
        bookings: []
    }).save()
    .then ( savedBoat => {
        console.log(savedBoat)
        User.findByIdAndUpdate(owner, { role: "owner", $push: {boats: savedBoat._id}}).then(udatedUser => {
            console.log(udatedUser)
            res.json({status: `Boat ${name} registered succesfully`})})
        })
    .catch(e => next(e));
})

boatRouter.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    //Check if all the bookings are inactive before deleting
    Boat.findById(id).populate('owner').then(boat=>{
        let updatedBoats=boat.owner.boats;
        updatedBoats.splice(updatedBoats.indexOf(id));
        User.findByIdAndUpdate(boat.owner, {boats: updatedBoats}).then((user)=>console.log(`Boats updated un user ${user.username}`))
    })
    Boat.findByIdAndRemove(id)
        .then( obj => {
            if(obj){
                res.status(200).json({status:`Removed from db`});
            }else{
                throw new Error("Not existing ID");
            }
        })
        .catch(e => next(e))
})
module.exports = boatRouter;
