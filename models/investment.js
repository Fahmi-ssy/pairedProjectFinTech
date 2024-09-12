'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Investment.belongsTo(models.company)
      Investment.belongsTo(models.user)
      Investment.hasMany(models.investmenttype, {foreignKey: "InvestmentTypeId"})
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