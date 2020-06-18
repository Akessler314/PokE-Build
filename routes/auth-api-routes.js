const db = require('../models');
const passport = require('../config/passport');

module.exports = function(app) {
  // Logs in the user with the provided username and password in req.body
  app.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
  });

  // Adds a new creator with the given username and password
  app.post('/api/auth/signup', (req, res) => {
    db.Creator.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, '/api/auth/login');
      })
      .catch(err => {
        console.log(err);
        res.status(401);
      });
  });

  // Used to logout user
  app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // For getting user and id of currently logged in user
  app.get('/api/auth/user', (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });
};
