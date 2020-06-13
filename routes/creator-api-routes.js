const Creator = require('../controllers/creatorController');

module.exports = function(app) {
  // Get creator by id
  app.get('/api/creators/:id', (req, res) => {
    Creator.findById(req.params.id).then(results => {
      res.json(results);
    });
  });

  // Add a new creator
  app.post('/api/creators', (req, res) => {
    Creator.addCreator(req.body.username).then(results => {
      res.json(results);
    });
  });

  // Create a new pokemon for this creator
  app.post('/api/creators/:id/pokemon', (req, res) => {
    Creator.addPokemonToCreator(req.params.id, req.body).then(results => {
      res.json(results);
    });
  });
};
