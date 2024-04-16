'use strict';

const { Attendee } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Attendee.bulkCreate([
        {
          userId: 1,
          eventId: 1,
          status: 'pending',
        },
        {
          userId: 1,
          eventId: 2,
          status: 'attending',
        },
        {
          userId: 1,
          eventId: 3,
          status: 'attending',
        },
        {
          userId: 1,
          eventId: 4,
          status: 'pending',
        },
        {
          userId: 1,
          eventId: 5,
          status: null,
        },
        {
          userId: 2,
          eventId: 1,
          status: 'pending',
        },
        {
          userId: 2,
          eventId: 3,
          status: 'attending',
        },
        {
          userId: 2,
          eventId: 4,
          status: 'attending',
        },
        {
          userId: 3,
          eventId: 5,
          status: 'attending',
        },
      ]);
    } catch (error) {
      console.error('Error during Attendee bulkCreate:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Attendees';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1, 2] },
      },
      {}
    );
  },
};
