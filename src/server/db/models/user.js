'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE
    },
    phone: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // User.belongsToMany(models.Role, { as: 'Roles', through: 'UserRoles', foreignKey: 'userId' })
      }
    }
  });
  return User;
};