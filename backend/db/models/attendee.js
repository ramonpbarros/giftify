'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    static associate(models) {
      Attendee.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Attendee.belongsTo(models.Event, {
        foreignKey: 'eventId',
      });
    }
  }
  Attendee.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Attendee',
    }
  );
  return Attendee;
};
