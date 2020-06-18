const db = require('../models');
const passport = require('../config/passport');

module.exports = function(app) {
  app.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
  });

  app.post('/api/auth/signup', (req, res) => {
    db.Creator.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, '/api/auth/login');
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

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
