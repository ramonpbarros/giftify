'use strict';

const { Wishlist } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Wishlist.bulkCreate([
        {
          attendeeId: 1,
          eventId: 1,
        },
        {
          attendeeId: 2,
          eventId: 1,
        },
        {
          attendeeId: 4,
          eventId: 3,
        },
        {
          attendeeId: 5,
          eventId: 4,
        },
        {
          attendeeId: 6,
          eventId: 5,
        },
      ]);
    } catch (error) {
      console.error('Error during Attendee bulkCreate:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Wishlists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        eventId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
