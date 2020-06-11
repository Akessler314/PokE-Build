const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

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

  // Search for pokemon by name
  app.get('/api/pokemon/search/:term', (req, res) => {
    db.Pokemon.findAll({
      where: {
        searchableName: {
          [Op.like]: '%' + req.params.term.toLowerCase() + '%'
        }
      }
    }).then(pokemon => {
      res.json(pokemon);
    });
  });
};
