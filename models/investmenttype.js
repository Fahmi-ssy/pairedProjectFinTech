'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InvestmentType extends Model {
    static associate(models) {
      InvestmentType.hasMany(models.Investment, { foreignKey: "InvestmentTypeId" });
    }
  }
  InvestmentType.init({
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'InvestmentType',
  });
  return InvestmentType;
};
