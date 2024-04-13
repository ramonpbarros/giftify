'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Wishlist, {
        foreignKey: 'wishlistId',
      });
    }
  }
  Product.init(
    {
      wishlistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productImgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      productPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      productLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
