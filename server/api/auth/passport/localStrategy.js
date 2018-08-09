const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../User.model');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false, { message: 'Usuario incorrecto' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Contraseña incorrecta' });
      return;
    }

    next(null, foundUser);
  });
}));