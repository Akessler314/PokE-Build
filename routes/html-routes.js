const Pokemon = require('../controllers/pokemonController');
const Creator = require('../controllers/creatorController');

module.exports = function(app) {
  // The battle sim page
  app.get('/pokemon/battle/:id1/:id2', (req, res) => {
    // Main index page
    app.get('/', (req, res) => {
      res.render('index');
    });

    // Check to see if the user is logged in and id1 is their pokemon
    if (!req.user) {
      res.redirect('/login');
    } else if (req.user.id !== req.params.id1) {
      res.redirect('/');
    } else {
      res.render('battle', {
        pokemon1: req.params.id1,
        pokemon2: req.params.id2
      });
    }
  });

  app.get('/', (req, res) => {
    res.render('index');
  });

  // View own pokemon page
  app.get('/view-own/:id', (req, res) => {
    if (!req.user) {
      res.redirect('/login');
    } else {
      Creator.findById(req.params.id).then(results => {
        res.render('view-own-pokemon', { pokemon: results.dataValues });
      });
    }
  });

  // Pokemon creation page
  app.get('/pixel', (req, res) => {
    // Check to see if the user is logged in
    if (!req.user) {
      res.redirect('/login');
    } else {
      res.render('pixel');
    }
  });

  // Pokemon index page
  app.get('/pokemon/index/:page', (req, res) => {
    Pokemon.findAllInOrder('updatedAt', 'DESC', req.params.page).then(
      results => {
        res.render('view-all-pokemon', { pokemon: results });
      }
    );
  });

  // Signup page
  app.get('/signup', (req, res) => {
    if (req.user) {
      res.redirect('/');
    } else {
      res.render('signUp');
    }
  });

  // Login page
  app.get('/login', (req, res) => {
    if (req.user) {
      res.redirect('/');
    } else {
      res.render('login');
    }
  });
};
