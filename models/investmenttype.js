'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InvestmentType extends Model {
    static associate(models) {
      InvestmentType.belongsTo(models.Investment)
    }
  }
  InvestmentType.init({
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InvestmentType',
  });
  return InvestmentType;
};
