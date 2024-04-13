'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Products',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        wishlistId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Wishlists' },
          onDelete: 'CASCADE',
        },
        productName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        productDescription: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        productImgUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        productPrice: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
        },
        productLink: {
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
    options.tableName = 'Products';
    return queryInterface.dropTable(options);
  },
};
