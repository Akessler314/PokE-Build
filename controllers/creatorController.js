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
    const fields = pokemonObj;
    fields.CreatorId = creatorId;
    return db.Pokemon.create(fields);
  }
};

module.exports = Creator;
