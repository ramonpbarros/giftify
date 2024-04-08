'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: 'demo@user.io',
          firstName: 'demonName1',
          lastName: 'demonLast1',
          username: 'Demo-lition',
          bio: 'This is a demo user account.',
          imgUrl:
            'https://res.cloudinary.com/drv1e8rjp/image/upload/v1711074668/landpage_rewards_card_enp3fm.png',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: 'user1@user.io',
          firstName: null,
          lastName: null,
          username: 'FakeUser1',
          bio: null,
          imgUrl: null,
          hashedPassword: bcrypt.hashSync('password2'),
        },
        {
          email: 'user2@user.io',
          firstName: null,
          lastName: null,
          username: 'FakeUser2',
          bio: null,
          imgUrl: null,
          hashedPassword: bcrypt.hashSync('password3'),
        },
      ],
      { validate: true }
    );
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
