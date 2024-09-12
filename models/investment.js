'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    static associate(models) {
      Investment.belongsTo(models.Company)
      Investment.belongsTo(models.User)
      Investment.hasMany(models.InvestmentType, {foreignKey: "InvestmentTypeId"})
    }
  }
  Investment.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    amount: DataTypes.DECIMAL,
    UserId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER,
    InvestmentTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};
