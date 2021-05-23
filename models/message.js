'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  message.init({
    sender_id: DataTypes.STRING,
    receiver_id: DataTypes.STRING,
    message: DataTypes.STRING,
    status: DataTypes.ENUM('OPEN', 'CLOSE', 'DELETED'),
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};