/* eslint-disable prefer-arrow-callback */
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  const Creator = sequelize.define('Creator', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Creator.associate = function(models) {
    // Each creator can have many pokemon
    Creator.hasMany(models.Pokemon, {
      as: 'Pokemon',
      onDelete: 'cascade'
    });
  };

  Creator.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  Creator.beforeCreate(creator => {
    creator.password = bcrypt.hashSync(
      creator.password,
      bcrypt.genSaltSync(10),
      null
    );

    return creator;
  });

  return Creator;
};
