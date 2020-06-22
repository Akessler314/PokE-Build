const Pokemon = require('../controllers/pokemonController');

module.exports = function(app) {
  // Get pokemon by id
  app.get('/api/pokemon/:id', (req, res) => {
    Pokemon.findById(req.params.id).then(results => {
      res.json(results);
    });
  });

  // Search for pokemon by name
  app.get('/api/pokemon/search/:term/:page?', (req, res) => {
    const page = req.params.page || 0;
    Pokemon.findByTerm(req.params.term, page).then(results => {
      res.json(results);
    });
  });

  // API page for pokemon index page
  app.get('/api/pokemon/index/:page', (req, res) => {
    const page = req.params.page || 0;
    Pokemon.findAllInOrder('updatedAt', 'DESC', page).then(results => {
      res.json(results);
    });
  });

  // Delete pokemon
  app.get('/api/pokemon/delete/:id', (req, res) => {
    Pokemon.deleteWithId(req.params.id).then(results => {
      res.json(results);
    });
  });
};
