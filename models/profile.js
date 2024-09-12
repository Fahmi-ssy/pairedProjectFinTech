'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    // Add your Profile model attributes here
    // For example:
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // Add other fields as needed
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
