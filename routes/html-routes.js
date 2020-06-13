const Pokemon = require('../controllers/pokemonController');

module.exports = function(app) {
  app.get('/pokemon/battle/:id1/:id2', (req, res) => {
    res.render('battle', {
      pokemon1: req.params.id1,
      pokemon2: req.params.id2
    });
  });

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/pixel', (req, res) => {
    res.render('pixel');
  });

  app.get('/pokemon/index/:page', (req, res) => {
    Pokemon.findAllInOrder('updatedAt', 'DESC', req.params.page).then(
      results => {
        res.render('view-all-pokemon', { pokemon: results });
      }
    );
  });
};
