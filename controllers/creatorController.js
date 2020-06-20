const db = require('../models');
const gifEncoder = require('gif-encoder');

const Creator = {
  findById: function(id) {
    return db.Creator.findOne({
      where: {
        id: id
      },
      include: {
        model: db.Pokemon,
        as: 'Pokemon'
      },
      attributes: {
        exclude: ['password']
      }
    });
  },
  findByUsername: function(username) {
    return db.Creator.findOne({
      where: {
        username: username
      },
      attributes: {
        exclude: ['password']
      }
    });
  },
  addCreator: function(username) {
    return db.Creator.create(username);
  },
  addPokemonToCreator: function(creatorId, pokemonObj) {
    const gif = new gifEncoder(32, 32);

    // When the gif is created, add it as a data URL to the pokemon
    gif.on('readable', () => {
      const base64 = 'data:image/gif;base64,' + gif.read().toString('base64');

      pokemonObj.CreatorId = creatorId;
      pokemonObj.sprite = base64;

      db.Pokemon.create(pokemonObj);
    });

    // Create gif
    gif.writeHeader();
    gif.addFrame(pokemonObj.sprite);
    gif.finish();
  }
};

module.exports = Creator;
