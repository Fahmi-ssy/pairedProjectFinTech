'use strict';
const {
  Model
} = require('sequelize');
var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.investment)
      User.hasOne(models.profile)
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    ProfileId: DataTypes.INTEGER
  }, {
    hooks:{
        beforeCreate(instance, options){
          const salt = bcrypt.genSaltSync(8);
          const hash = bcrypt.hashSync(instance.password, salt)
          instance.password = hash
        }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};