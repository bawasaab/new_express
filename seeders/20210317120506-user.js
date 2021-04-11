'use strict';
var dated = new Date();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('Users', [
       {
        first_name: 'Deepak',
        last_name: 'Bawa',
        email: 'bawa_d@ymail.com',
        profile_pic: null,
        password: '123456',
        dob: dated,
        role: 'USER',
        status: 'OPEN',
        createdAt: dated
      },
      {
        first_name: 'jaspreet',
        last_name: 'singh',
        email: 'jassweb@yopmail.com',
        profile_pic: null,
        password: '123456',
        dob: dated,
        role: 'USER',
        status: 'OPEN',
        createdAt: dated
      },
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
