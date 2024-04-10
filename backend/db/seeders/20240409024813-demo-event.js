'use strict';

const { Event } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Event.bulkCreate([
        {
          userId: 1,
          eventName: 'A/a Secret Santa',
          eventDate: '2024-12-20',
          eventDescription:
            'A fun Secret Santa event where participants exchange gifts anonymously.',
          maxGiftCost: 50,
          maxAttendees: 15,
          private: true,
          imgUrl:
            'https://res.cloudinary.com/drv1e8rjp/image/upload/v1711245334/frame_one_uf6eoa.jpg',
        },
        {
          userId: 1,
          eventName: 'Secret Buddy',
          eventDate: '2024-12-15',
          eventDescription:
            'A fun Secret Santa event where participants exchange gifts anonymously.',
          maxGiftCost: 10,
          maxAttendees: 20,
          private: false,
          imgUrl:
            'https://res.cloudinary.com/drv1e8rjp/image/upload/v1711245334/frame_one_uf6eoa.jpg',
        },
        {
          userId: 2,
          eventName: 'Work Secret Buddy',
          eventDate: '2024-12-13',
          eventDescription:
            'A fun Secret Buddy event where participants exchange gifts anonymously.',
          maxGiftCost: null,
          maxAttendees: 2,
          private: true,
          imgUrl:
            'https://res.cloudinary.com/drv1e8rjp/image/upload/v1711245334/frame_one_uf6eoa.jpg',
        },
        {
          userId: 2,
          eventName: 'Work Secret Buddy 2',
          eventDate: '2024-12-12',
          eventDescription:
            'A fun Secret Buddy event where participants exchange gifts anonymously. 2',
          maxGiftCost: null,
          maxAttendees: null,
          private: true,
          imgUrl:
            'https://res.cloudinary.com/drv1e8rjp/image/upload/v1711245334/frame_one_uf6eoa.jpg',
        },
        {
          userId: 3,
          eventName: 'Family Secret Santa',
          eventDate: '2024-12-24',
          eventDescription:
            'A fun Secret Santa event where participants exchange gifts anonymously.',
          maxGiftCost: 100,
          maxAttendees: 10,
          private: true,
          imgUrl:
            'https://res.cloudinary.com/drv1e8rjp/image/upload/v1711245334/frame_one_uf6eoa.jpg',
        },
      ]);
    } catch (error) {
      console.error('Error during Event bulkCreate:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1, 3] },
      },
      {}
    );
  },
};
