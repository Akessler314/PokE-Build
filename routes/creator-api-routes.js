/* eslint-disable no-else-return */
const Creator = require('../controllers/creatorController');

module.exports = function(app) {
  // Get creator by id
  app.get('/api/creators/:id', (req, res) => {
    Creator.findById(req.params.id).then(results => {
      res.json(results);
    });
  });

  app.get('/api/creators/user/:username', (req, res) => {
    Creator.findByUsername(req.params.username).then(results => {
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
    // Check to make sure we're logged in as the creator we're making the pokemon for
    if (!req.user || req.user.id !== parseInt(req.params.id)) {
      console.log(req.user, req.params.id);
      res.status(401);
      res.end();
    } else {
      Creator.addPokemonToCreator(req.params.id, req.body);
      res.status(201);
      res.end();
    }
  });
};
