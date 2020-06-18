const Pokemon = require('../controllers/pokemonController');

module.exports = function(app) {
  app.get('/pokemon/battle/:id1/:id2', (req, res) => {
    // Check to see if the user is logged in and id1 is their pokemon
    if (!req.user) {
      res.redirect('/login');
    } else if (req.user.id !== req.params.id1) {
      res.status(401).end();
    }

    res.render('battle', {
      pokemon1: req.params.id1,
      pokemon2: req.params.id2
    });
  });

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/pixel', (req, res) => {
    // Check to see if the user is logged in
    if (!req.user) {
      res.redirect('/login');
    }
    res.render('pixel');
  });

  app.get('/pokemon/index/:page', (req, res) => {
    Pokemon.findAllInOrder('updatedAt', 'DESC', req.params.page).then(
      results => {
        res.render('view-all-pokemon', { pokemon: results });
      }
    );
  });

  app.get('/signup', (req, res) => {
    if (req.user) {
      res.redirect('/');
    }
    res.render('signUp');
  });

  app.get('/login', (req, res) => {
    if (req.user) {
      res.redirect('/');
    }
    res.render('login');
  });
};
