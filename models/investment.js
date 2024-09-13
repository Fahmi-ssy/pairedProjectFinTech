'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    static associate(models) {
      Investment.belongsTo(models.Company);  // Association with Company
      Investment.belongsTo(models.User);     // Association with User
      Investment.belongsTo(models.InvestmentType, { foreignKey: "InvestmentTypeId" });  // Ensure this association exists
    }
  }
  Investment.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    amount: DataTypes.DECIMAL,
    UserId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER,
    InvestmentTypeId: DataTypes.INTEGER  // Define InvestmentTypeId field here
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};
