'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    userId: DataTypes.INTEGER,
    eventName: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    eventDescription: DataTypes.STRING,
    maxGiftCost: DataTypes.INTEGER,
    maxAttendees: DataTypes.INTEGER,
    private: DataTypes.BOOLEAN,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};