const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const gifEncoder = require('gif-encoder');

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

  // Add sprite to this Pokemon
  app.post('/api/pokemon/:id/sprite', (req, res) => {
    const gif = new gifEncoder(req.body.width, req.body.height);

    // When the gif is created, add it as a data URL to the pokemon
    gif.on('readable', () => {
      const base64 = 'data:image/gif;base64,' + gif.read().toString('base64');

      db.Pokemon.update(
        {
          sprite: base64
        },
        {
          where: {
            id: req.params.id
          }
        }
      ).then(() => {
        res.end();
      });
    });

    // Create gif
    gif.writeHeader();
    gif.addFrame(req.body.pixelVals);
    gif.finish();
  });
};
