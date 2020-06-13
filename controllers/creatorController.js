const db = require('../models');

const Creator = {
  findById: function(id) {
    return db.Creator.findOne({
      where: {
        id: id
      },
      include: {
        model: db.Pokemon,
        as: 'Pokemon'
      }
    });
  },
  addCreator: function(username) {
    return db.Creator.create(username);
  },
  addPokemonToCreator: function(creatorId, pokemonObj) {
    const fields = pokemonObj;
    fields.CreatorId = creatorId;
    return db.Pokemon.create(fields);
  }
};

module.exports = Creator;
