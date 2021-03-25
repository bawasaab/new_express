'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sockets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sockets.init({
    user_id: DataTypes.INTEGER,
    socket_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sockets',
  });
  return Sockets;
};