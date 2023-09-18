'use strict';
const bcrpyt = require("bcryptjs")
const categories = require('../categories.json').map((e) => { 
  e.createdAt = e.updatedAt = new Date()
  return e
})
const data = require("../user.json").map((e) => {
  e.createdAt = e.updatedAt = new Date();
  e.password = bcrpyt.hashSync(e.password, bcrpyt.genSaltSync(8));
  return e;
});

const items = require('../items.json').map((e) => { 
  e.createdAt = e.updatedAt = new Date()
  return e
})

const ingredients = require('../ingredients.json').map((e) => { 
  e.createdAt = e.updatedAt = new Date()
  return e
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", categories)
    await queryInterface.bulkInsert("Items", items)
    await queryInterface.bulkInsert("Ingredients", ingredients)
    await queryInterface.bulkInsert("Users", data);

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users")
    await queryInterface.bulkDelete("Ingredients");
    await queryInterface.bulkDelete("Items");
    await queryInterface.bulkDelete("Categories");
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
