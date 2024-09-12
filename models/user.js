'use strict';
const { Model } = require('sequelize');
var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Investment);
      User.hasOne(models.Profile);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name cannot be empty"
        },
        len: {
          args: [3, 50],
          msg: "Name must be between 3 and 50 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email address already in use"
      },
      validate: {
        isEmail: {
          msg: "Must be a valid email address"
        },
        notNull: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        len: {
          args: [6],
          msg: "Password must be at least 6 characters long"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role is required"
        },
        isIn: {
          args: [['user', 'admin']],
          msg: "Role must be either 'user' or 'admin'"
        }
      }
    },
    ProfileId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};
