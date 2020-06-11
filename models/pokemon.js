module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
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
=======
  const Pokemon = sequelize.define('Pokemon', {
    name: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    spdefense: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    spattack: DataTypes.INTEGER,
    moveid1: DataTypes.INTEGER,
    moveid2: DataTypes.INTEGER,
    moveid3: DataTypes.INTEGER,
    moveid4: DataTypes.INTEGER
>>>>>>> 3a95ebe14271c81e6ab14b8a99aa2a8c0a3a7829
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
