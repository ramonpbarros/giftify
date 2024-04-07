'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(
        [
          {
            email: 'demo@user.io',
            username: 'Demo-lition',
            hashedPassword: bcrypt.hashSync('password'),
            firstName: 'Demo',
            lastName: 'User',
            bio: 'This is a demo user account.',
            imgUrl:
              'https://res.cloudinary.com/drv1e8rjp/image/upload/v1711074668/landpage_rewards_card_enp3fm.png',
          },
          {
            email: 'user1@user.io',
            username: 'FakeUser1',
            hashedPassword: bcrypt.hashSync('password2'),
            firstName: null,
            lastName: null,
            bio: null,
            imgUrl: null,
          },
          {
            email: 'user2@user.io',
            username: 'FakeUser2',
            hashedPassword: bcrypt.hashSync('password3'),
            firstName: null,
            lastName: null,
            bio: null,
            imgUrl: null,
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
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
      },
      {}
    );
  },
};
