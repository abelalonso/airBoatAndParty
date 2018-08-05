const express = require('express');
const commentRouter = express.Router();
const Comment = require('./Comment.model');
const Boat = require('../boats/Boat.model');
const User = require('../auth/User.model');
const uploadCloud = require ('../../config/cloudinary');

commentRouter.get('/:id', (req, res, next) => {
  Comment.find({boat: req.params.id}).populate('author')
  .then( objList => res.status(200).json(objList))
  .catch(e => next(e))
});

commentRouter.post('/:id', uploadCloud.single('file'), (req, res, next) => {
  const {author, content} = req.body;
  
  newComment = new Comment({
    author, content,
    date: new Date(),
    boat: req.params.id
  })
  console.log(newComment)
  if (req.file){
    let photos = [];
    photos.push(req.file.secure_url)
    newComment.photos
  }

  newComment.save()
  .then ( savedComment => {
        res.json({status: `Comment ${newComment._id} registered succesfully`})
    })
.catch(e => next(e));
})

module.exports = commentRouter;
