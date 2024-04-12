'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Event.hasMany(models.Attendee, {
        foreignKey: 'eventId'
      })

      Event.hasMany(models.Wishlist, {
        foreignKey: 'eventId'
      })
    }
  }
  Event.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { isDate: true },
      },
      eventDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxGiftCost: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      maxAttendees: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
};
