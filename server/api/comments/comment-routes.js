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

commentRouter.post('/', uploadCloud.single('file'), (req, res, next) => {

  const {content, rate, boat, booking} = req.body;
  
  if(req.file){
    Comment.findOne({boat, booking, content, rate})
    .then(comment=>{
      if (comment) {
        Comment.findByIdAndUpdate(comment._id, {$push: {photos: req.file.secure_url}})
        .then(res.json({status: `Added photo to ${boat.name}`}))
        .catch(e=>res.json(e))
      } else {
        createComment();
      }
    })
  }else{
    createComment();
  }
  function createComment() {
    newComment = new Comment({
      boat, booking, rate, content,
      date: new Date(),
      author: req.user.id,
      photos: []
    })

    if (req.file){
      newComment.photos = [req.file.secure_url];
    }

    newComment.save()
    .then ( savedComment => {
          res.json({status: `Comment ${newComment._id} registered succesfully`})
      })
    .catch(e => next(e));
  }
})

module.exports = commentRouter;
