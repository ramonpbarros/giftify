const express = require('express');
const { Op } = require('sequelize');
const { Event } = require('../../db/models');
const event = require('../../db/models/event');

const router = express.Router();

// Get all Events
router.get('/', async (req, res) => {
  try {
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);

    if (isNaN(page)) {
      page = 1;
    }
    if (isNaN(size)) {
      size = 10;
    }
    let limit = size;
    let offset = (page - 1) * size;

    if (page == 0 && size == 0) {
      limit = null;
      offset = null;
      page = 1;
    }

    const events = await Event.findAll({
      limit,
      offset,
    });

    const formattedEvents = events.map((event) => {
      const formattedEvent = event.toJSON();

      const newTimeUpdatedAt = new Date(formattedEvent.updatedAt)
        .toISOString()
        .split('')
        .slice(11, 19)
        .join('');

      const newDateUpdatedAt = new Date(formattedEvent.updatedAt)
        .toISOString()
        .split('T')[0];

      const newTimeCreatedAt = new Date(formattedEvent.createdAt)
        .toISOString()
        .split('')
        .slice(11, 19)
        .join('');

      const newDateCreatedAt = new Date(formattedEvent.createdAt)
        .toISOString()
        .split('T')[0];

      const newDateEventDate = new Date(formattedEvent.eventDate)
        .toISOString()
        .split('T')[0];

      delete formattedEvent.createdAt;
      delete formattedEvent.updatedAt;
      delete formattedEvent.eventDate;

      formattedEvent.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
      formattedEvent.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;
      formattedEvent.eventDate = `${newDateEventDate}`;

      return formattedEvent;
    });

    res.json({ Events: formattedEvents, page, size });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
