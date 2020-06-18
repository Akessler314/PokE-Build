const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');

// Use local strategy with passport (We're storing stuff on our end)
passport.use(
  new LocalStrategy((username, password, done) => {
    // When a user tries to sign in this code runs
    db.Creator.findOne({
      where: {
        username: username
      }
    }).then(dbCreator => {
      // Invalid username
      if (!dbCreator) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      // Invalid password
      else if (!dbCreator.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }

      // Valid login
      return done(null, dbCreator);
    });
  })
);

// Boilerplate
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
