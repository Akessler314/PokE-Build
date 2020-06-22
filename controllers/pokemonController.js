const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

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
  deleteWithId: function(id) {
    return db.Pokemon.destroy({
      where: {
        id: id
      }
    });
  }
};

module.exports = Pokemon;
