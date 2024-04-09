'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Events',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Users' },
          onDelete: 'CASCADE',
        },
        eventName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        eventDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        eventDescription: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        maxGiftCost: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        maxAttendees: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        private: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        imgUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    return queryInterface.dropTable(options);
  },
};
