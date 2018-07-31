const express = require('express');
const authRouter  = express.Router();
const User = require('./User.model');
const passport = require('passport');

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
authRouter.post("/signup", (req, res, next) => {
  const {username, password, name, surname, email, profileImage} = req.body;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
    .then( foundUser => {
    if (foundUser !== null) throw new Error('Username already exists');

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    return newUser = new User({
      username,
      password: hashPass,
      name, 
      surname, 
      email, 
      profileImage,
      boats: []
    }).save()
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
