const express = require('express');
const { Event, User } = require('../../db/models');
const { requireAuth, isAuthorized } = require('../../utils/auth');
const {
  validateCreateEvent,
  validateEditEvent,
} = require('../../utils/sequelize-validations');

const router = express.Router();

// Get all Events
router.get('/', requireAuth, async (req, res) => {
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

// Get details of an Event specified by its id
router.get('/:eventId', requireAuth, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId, {
    // include: [{ model: User }],
  });

  if (!event) {
    res.status(404);
    res.send({ message: "Event couldn't be found" });
  }

  const user = await User.findByPk(event.userId, {
    attributes: { exclude: ['firstName', 'lastName', 'bio', 'imgUrl'] },
  });

  const formattedUser = user.toJSON();

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
  formattedEvent.Organizer = formattedUser;

  res.json(formattedEvent);
});

// Create Event for the Current User
router.post('/', requireAuth, validateCreateEvent, async (req, res) => {
  const { eventName, eventDescription, eventDate, private } = req.body;

  const currentUser = req.user.toJSON();

  const newEvent = await Event.create({
    userId: currentUser.id,
    eventName,
    eventDescription,
    eventDate,
    private,
  });

  let currentNewEvent = newEvent.toJSON();

  const newTimeUpdatedAt = new Date(currentNewEvent.updatedAt)
    .toISOString()
    .split('')
    .slice(11, 19)
    .join('');

  const newDateUpdatedAt = new Date(currentNewEvent.updatedAt)
    .toISOString()
    .split('T')[0];

  const newTimeCreatedAt = new Date(currentNewEvent.createdAt)
    .toISOString()
    .split('')
    .slice(11, 19)
    .join('');

  const newDateCreatedAt = new Date(currentNewEvent.createdAt)
    .toISOString()
    .split('T')[0];

  delete formattedEvent.createdAt;
  delete formattedEvent.updatedAt;

  currentNewEvent.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
  currentNewEvent.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

  res.status(201).json(currentNewEvent);
});

// Edit the Current User's Event
router.put('/:eventId', requireAuth, validateEditEvent, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  const eventUpdated = await event.update(req.body);

  let currentEvent = eventUpdated.toJSON();

  const newTimeUpdatedAt = new Date(currentEvent.updatedAt)
    .toISOString()
    .split('')
    .slice(11, 19)
    .join('');

  const newDateUpdatedAt = new Date(currentEvent.updatedAt)
    .toISOString()
    .split('T')[0];

  const newTimeCreatedAt = new Date(currentEvent.createdAt)
    .toISOString()
    .split('')
    .slice(11, 19)
    .join('');

  const newDateCreatedAt = new Date(currentEvent.createdAt)
    .toISOString()
    .split('T')[0];

  delete formattedEvent.createdAt;
  delete formattedEvent.updatedAt;

  currentEvent.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
  currentEvent.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

  res.json(currentEvent);
});

// Delete the Current User's Event
router.delete('/:eventId', requireAuth, isAuthorized, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  await event.destroy();

  res.json({
    message: 'Successfully deleted',
  });
});

module.exports = router;
