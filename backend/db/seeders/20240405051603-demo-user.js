'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      await User.bulkCreate(
        [
          {
            email: 'demo@user.io',
            username: 'demo',
            hashedPassword: bcrypt.hashSync('password'),
            firstName: 'Demo',
            lastName: 'User',
            bio: 'This is a demo user account.',
            imgUrl:
              'https://res.cloudinary.com/drv1e8rjp/image/upload/v1711074668/landpage_rewards_card_enp3fm.png',
          },
          {
            email: 'ramon@user.io',
            username: 'ramon',
            hashedPassword: bcrypt.hashSync('password'),
          },
          {
            email: 'user@user.io',
            username: 'fakeUser',
            hashedPassword: bcrypt.hashSync('password3'),
          },
        ],
        { validate: true }
      );
    } catch (error) {
      console.error('Error during bulkCreate:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ['demo', 'ramon', 'fakeUser'] },
      },
      {}
    );
  },
};
