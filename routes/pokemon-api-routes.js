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
  app.get('/api/pokemon/search/:term/:page?', (req, res) => {
    let page = 0;
    const pageLimit = 20;
    if (req.params.page) {
      page = parseInt(req.params.page);
    }

    db.Pokemon.findAll({
      where: {
        searchableName: {
          [Op.like]: '%' + req.params.term.toLowerCase() + '%'
        }
      },
      limit: pageLimit,
      offset: page * pageLimit
    }).then(pokemon => {
      res.json(pokemon);
    });
  });
};
