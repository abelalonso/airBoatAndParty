const express = require('express');
const boatRouter = express.Router();
const Boat = require('./Boat.model');
const User = require('../auth/User.model');
const uploadCloud = require ('../../config/cloudinary')

/* GET home page */

boatRouter.get('/', (req, res, next) => {
    Boat.find().populate('owner').populate('bookings')
    .then( objList => res.status(200).json(objList))
    .catch(e => next(e))
});

boatRouter.get('/:id', (req, res, next) => {
    Boat.find({owner: req.params.id}).populate('owner')
    .then( objList => res.status(200).json(objList))
    .catch(e => next(e))
});


boatRouter.post('/', uploadCloud.single('file'), (req, res, next) => {
    const {name, capacity, crew, dimensions, description, owner, pricePerDay, position, city} = req.body;
    //Create the boat
    newBoat = new Boat({
        name, capacity, crew, dimensions, description, owner, pricePerDay, position, city,
        photos: ['https://res.cloudinary.com/abel-alonso/image/upload/v1533033995/airByP/images.png'],
        bookings: []
    })

    if(req.file){
        let photos=[];
        photos.push(req.file.secure_url);
        newBoat.photos = photos;
    }
    
    newBoat.save()
    .then ( savedBoat => {
        User.findByIdAndUpdate(owner, { role: "owner", $push: {boats: savedBoat._id}}).then(udatedUser => {
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
