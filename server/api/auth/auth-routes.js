const express = require('express');
const authRouter  = express.Router();
const User = require('./User.model');
const passport = require('passport');
const uploadCloud = require ('../../config/cloudinary')


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//Auto-login
const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}

// SIGNUP
authRouter.post("/signup", uploadCloud.single('file'), (req, res, next) => {

  console.log("desde el cliente", req)
  const {username, password, name, surname, email, profileImage} = req.body;
  
  // Check for non empty user or password
  if (!username || !password){
    next(new Error('You must provide valid credentials'));
  }

  User.findOne({ username })
    .then( foundUser => {
    if (foundUser !== null) throw new Error('Username already exists');

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

 
    
    console.log("imagen: ", req.file)

    newUser = new User({
      username,
      password: hashPass,
      name, 
      surname, 
      email, 
      boats: [],
      bookings: []
    })

    if (req.file){
      newUser.profileImage = req.file.secure_url;
    }

    newUser.save()
    .then( savedUser => login(req, savedUser)) // Login the user using passport
    .then( user => res.json({status: 'signup & login successfully', user})) // Answer JSON
    .catch(e => next(e));
  })
  .catch(e => next(e));
});


authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    
    // Check for errors
    if (err) next(new Error('Something went wrong')); 
    if (!theUser) next(failureDetails)

    // Return user and logged in
    login(req, theUser).then(user => res.status(200).json(req.user));

  })(req, res, next);
});


authRouter.get('/currentuser', (req,res,next) => {
  if(req.user){
    res.status(200).json(req.user);
  }else{
    next(new Error('Not logged in'))
  }
})


authRouter.get('/logout', (req,res) => {
  req.logout();
  res.status(200).json({message:'logged out'})
});

authRouter.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})

module.exports = authRouter;
