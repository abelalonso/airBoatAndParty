const express = require('express');
const boatRouter = express.Router();
const Boat = require('./Boat.model');
const User = require('../auth/User.model');
const Station = require('../meteo/station.model');
const uploadCloud = require ('../../config/cloudinary');

/* GET home page */

boatRouter.get('/', (req, res, next) => {
    Boat.find().populate('owner').populate('bookings').populate('station')
    .then( objList => res.status(200).json(objList))
    .catch(e => next(e))
});

boatRouter.get('/:id', (req, res, next) => {
    Boat.find({owner: req.params.id}).populate('owner')
    .then( objList => res.status(200).json(objList))
    .catch(e => next(e))
});


boatRouter.post('/', uploadCloud.single('file'), (req, res, next) => {

    const {name, capacity, crew, patron, description, owner, pricePerDay} = req.body;

    if(req.file){
        Boat.findOne({name, owner}).then(boat=>{

            if (boat){          
                Boat.findByIdAndUpdate(boat._id, {$push: {photos: req.file.secure_url}})
                .then(res.json({status: `Added photo to ${boat.name}`}))
                .catch(res.json(e))
            } else {
                //Create the boat
                createBoat();
            }
        })
    }else{
        createBoat();
    }

    function createBoat (){ 
        newBoat = new Boat({
            name, capacity, crew, patron, description, owner, pricePerDay,
            photos: ['https://res.cloudinary.com/abel-alonso/image/upload/v1533033995/airByP/images.png'],
            bookings: []
        })

        Station.findById(req.body.station).then(station=>{
            newBoat.station=station
            
            console.log(newBoat)
            if(req.file){
                console.log("primera foto")
                let photos=[];
                photos.push(req.file.secure_url);
                newBoat.photos = photos;
            }
            
            newBoat.save()
            .then ( savedBoat => {
                User.findByIdAndUpdate(owner, { role: "Propietario", $push: {boats: savedBoat._id}}).then(udatedUser => {
                    res.json({status: `Boat ${name} registered succesfully`})})
                })
            .catch(e => {
                console.log(e)
                res.json(e)
            });
        })
        .catch(e=>{
            console.log(e)
        })
    }
})

boatRouter.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    //Check if all the bookings are inactive before deleting
    Boat.findById(id).populate('owner').then(boat=>{
        let updatedBoats=boat.owner.boats;
        updatedBoats.splice(updatedBoats.indexOf(id));
        User.findByIdAndUpdate(boat.owner, {boats: updatedBoats}).then((user)=>console.log(`Boats updated un user ${user.username}`))
    });

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
