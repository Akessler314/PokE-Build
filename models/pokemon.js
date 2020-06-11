module.exports = function(sequelize, DataTypes) {
  const Pokemon = sequelize.define('Pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    searchableName: {
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
    // The first type can not be 'null' or 'None', as the Pokemon needs at least one type.
    // The second type can be 'None' or 'null', since some Pokemon may only have one type
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
    },

    // The Pokemon's sprite is stored as Base64, which is then used by the Canvas api to render the sprite as a .gif
    sprite: {
      type: DataTypes.TEXT,
      allowNull: true
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
