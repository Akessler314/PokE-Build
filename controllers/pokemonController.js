const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const gifEncoder = require('gif-encoder');

const Pokemon = {
  findById: function(id) {
    return db.Pokemon.findOne({
      where: {
        id: id
      },
      include: [db.Creator]
    });
  },
  findByTerm: function(term, page) {
    const pageLimit = 20;

    return db.Pokemon.findAll({
      where: {
        searchableName: {
          [Op.like]: '%' + term.toLowerCase() + '%'
        }
      },
      limit: pageLimit,
      offset: page * pageLimit
    });
  },
  findAllInOrder: function(orderField, order, page) {
    const pageLimit = 20;

    return db.Pokemon.findAll({
      order: [[orderField, order]],
      limit: pageLimit,
      offset: page * pageLimit
    });
  },
  updateSprite: function(pokemonId, spriteObj) {
    const gif = new gifEncoder(spriteObj.width, spriteObj.height);

    // When the gif is created, add it as a data URL to the pokemon
    gif.on('readable', () => {
      const base64 = 'data:image/gif;base64,' + gif.read().toString('base64');

      db.Pokemon.update(
        {
          sprite: base64
        },
        {
          where: {
            id: pokemonId
          }
        }
      );
    });

    // Create gif
    gif.writeHeader();
    gif.addFrame(spriteObj.pixelVals);
    gif.finish();
  }
};

module.exports = Pokemon;
