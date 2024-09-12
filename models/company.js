'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Investment)
    }
  }
  Company.init({
    name: DataTypes.STRING,
    companyLogo: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};
