'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.belongsTo(models.Attendee, {
        foreignKey: 'attendeeId',
      });

      Wishlist.belongsTo(models.Event, {
        foreignKey: 'eventId',
      });
    }
  }
  Wishlist.init(
    {
      attendeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Wishlist',
    }
  );
  return Wishlist;
};
