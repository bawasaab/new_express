'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Customer.init({
      accessToken: DataTypes.STRING,
      deviceType: DataTypes.STRING,
      deviceToken: DataTypes.STRING,
      createdAt: DataTypes.STRING,
      updatedAt: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      country: DataTypes.STRING,
      gender: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      postalcode: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      isBlocked: DataTypes.BOOLEAN,
      imageurl: DataTypes.STRING,
      address: DataTypes.STRING,
      age: DataTypes.STRING,
      fullName: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      weight: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      about: DataTypes.STRING,
      height: DataTypes.STRING,
      Orientation: DataTypes.STRING,
      Ethnicity: DataTypes.STRING,
      Martialstatus: DataTypes.STRING,
      Bodytype: DataTypes.STRING,
      Haircolor: DataTypes.STRING,
      Eyecolor: DataTypes.STRING,
      Tattos: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};