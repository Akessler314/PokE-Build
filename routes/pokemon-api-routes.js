const db = require('../models');

module.exports = function(app) {
  // Get creator by id
  app.get('/api/pokemon/:id', (req, res) => {
    db.Pokemon.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Creator]
    }).then(pokemon => {
      res.json(pokemon);
    });
  });
};
