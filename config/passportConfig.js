const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        await User.findOne({ email }).then((user) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect email' });
          }
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return done(err);
            }
            if (!result) {
              return done(null, false, { message: 'Incorrect password' });
            }
          
            return done(null, user);
          });
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
