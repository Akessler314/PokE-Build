const db = require('../models');

module.exports = function(app) {
  // Get creator by id
  app.get('/api/creators/:id', (req, res) => {
    db.Creator.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: db.Pokemon,
        as: 'Pokemon'
      }
    }).then(creator => {
      res.json(creator);
    });
  });

  // Add a new creator
  app.post('/api/creators', (req, res) => {
    db.Creator.create(req.body).then(creator => {
      res.json(creator);
    });
  });

  // Create a new pokemon for this creator
  app.post('/api/creators/:id/pokemon', (req, res) => {
    const fields = req.body;
    fields.CreatorId = req.params.id;
    db.Pokemon.create(fields).then(pokemon => {
      res.json(pokemon);
    });
  });
};
