module.exports = function(sequelize, DataTypes) {
  const Pokemon = sequelize.define("Pokemon", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stats: {
      type: DataTypes.JSON,
      allowNull: false
    },
    moves: {
      type: DataTypes.JSON,
      allowNull: false
    },

    // Types should use a value from the 'pokeTypes' array in the constants.js file
    type1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 18]
      }
    },
    type2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [0, 18]
      }
    }
  });

  Pokemon.associate = function(models) {
    Pokemon.belongsTo(models.Creator, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pokemon;
};
