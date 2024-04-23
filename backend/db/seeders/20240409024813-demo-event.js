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
            'A delightful Secret Santa event where participants exchange gifts anonymously within a budget of $50.',
          maxGiftCost: 50,
          maxAttendees: 15,
          private: true,
          imgUrl:
            'https://plus.unsplash.com/premium_photo-1681841639344-360d2a3afcf6?q=80&w=2978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          userId: 1,
          eventName: 'Secret Buddy',
          eventDate: '2024-12-15',
          eventDescription:
            'An enjoyable Secret Buddy event where participants exchange gifts anonymously within a budget of $10.',
          maxGiftCost: 10,
          maxAttendees: 20,
          private: false,
          imgUrl:
            'https://plus.unsplash.com/premium_photo-1684629279389-8fc4beb3236f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFydHl8ZW58MHx8MHx8fDA%3D',
        },
        {
          userId: 2,
          eventName: 'Work Secret Buddy',
          eventDate: '2024-12-13',
          eventDescription:
            'A workplace-oriented Secret Buddy event where participants exchange gifts anonymously with a maximum of 2 attendees.',
          maxGiftCost: null,
          maxAttendees: 10,
          private: true,
          imgUrl:
            'https://plus.unsplash.com/premium_photo-1677490069967-89c7150d6e74?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFydHl8ZW58MHx8MHx8fDA%3D',
        },
        {
          userId: 2,
          eventName: 'Work Secret Buddy 2',
          eventDate: '2024-12-12',
          eventDescription:
            'Another workplace-oriented Secret Buddy event where participants exchange gifts anonymously with flexible attendee limits.',
          maxGiftCost: null,
          maxAttendees: null,
          private: true,
          imgUrl:
            'https://images.unsplash.com/photo-1605744435343-bd38c8e97892?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
        },
        {
          userId: 3,
          eventName: 'Family Secret Santa',
          eventDate: '2024-12-24',
          eventDescription:
            'A heartwarming Secret Santa event among family members, with a maximum gift budget of $100 and 10 attendees.',
          maxGiftCost: 100,
          maxGiftCost: 100,
          maxAttendees: 10,
          private: true,
          imgUrl:
            'https://plus.unsplash.com/premium_photo-1681841376158-78f9db6e808b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8',
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
