module.exports = function(sequelize, DataTypes) {
  const Creator = sequelize.define("Creator", {
    username: DataTypes.STRING
  });

  Creator.associate = function(models) {
    // Each creator can have many pokemon
    Creator.hasMany(models.Pokemon, {
      as: "Pokemon",
      onDelete: "cascade"
    });
  };

  return Creator;
};
