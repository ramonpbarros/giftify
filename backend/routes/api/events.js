const express = require('express');
const { Event, User, Attendee, Wishlist } = require('../../db/models');
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

      formattedEvent.eventDate = `${newDateEventDate}`;
      formattedEvent.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
      formattedEvent.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

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
  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    res.status(404);
    res.send({ message: "Event couldn't be found" });
  }

  const user = await User.findByPk(event.userId, {
    attributes: { exclude: ['firstName', 'lastName', 'bio', 'imgUrl'] },
  });

  const attendees = await Attendee.findAll({
    where: {
      eventId: req.params.eventId,
    },
    include: {
      model: User,
      attributes: ['id', 'username'],
    },
  });

  for (const attendee of attendees) {
    const wishlist = await Wishlist.findAll({
      where: {
        eventId: req.params.eventId,
        attendeeId: attendee.userId,
      },
    });

    if (wishlist.length > 0) {
      const formattedWishlist = {
        id: wishlist[0].id,
      };
      attendee.User.dataValues.Wishlist = formattedWishlist;
    }
  }

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

  formattedEvent.Attendees = attendees.map((attendee) => ({
    id: attendee.User.id,
    username: attendee.User.username,
    Wishlist: attendee.User.dataValues.Wishlist || null,
  }));

  formattedEvent.Organizer = formattedUser;
  formattedEvent.eventDate = `${newDateEventDate}`;
  formattedEvent.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
  formattedEvent.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

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

  if (newEvent && newEvent.private) {
    await Attendee.create({
      userId: currentUser.id,
      eventId: newEvent.id,
      status: 'attending',
    });
  } else if (newEvent && !newEvent.private) {
    await Attendee.create({
      userId: currentUser.id,
      eventId: newEvent.id,
      status: null,
    });
  }

  let formattedEvent = newEvent.toJSON();

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

  formattedEvent.eventDate = `${newDateEventDate}`;
  formattedEvent.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
  formattedEvent.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

  res.status(201).json(formattedEvent);
});

// Edit the Current User's Event
router.put(
  '/:eventId',
  requireAuth,
  isAuthorized,
  validateEditEvent,
  async (req, res) => {
    const event = await Event.findByPk(req.params.eventId);

    const eventUpdated = await event.update(req.body);

    let formattedEvent = eventUpdated.toJSON();

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

    res.json(formattedEvent);
  }
);

// Delete the Current User's Event
router.delete('/:eventId', requireAuth, isAuthorized, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  await event.destroy();

  res.json({
    message: 'Successfully deleted',
  });
});

// Get all Attendees of an Event specified by its id
router.get('/:eventId/attendees', requireAuth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    const currentUser = req.user.toJSON();

    // Private event created by current user
    if (event.private && event.userId === currentUser.id) {
      const attendees = await Attendee.findAll({
        where: {
          eventId: req.params.eventId,
        },
        include: {
          model: User,
          attributes: ['id', 'username', 'firstName', 'lastName'],
        },
      });

      const formattedAttendees = attendees.map((attendee) => {
        return {
          id: attendee.id,
          username: attendee.User.username,
          firstName: attendee.User.firstName,
          lastName: attendee.User.lastName,
          status: attendee.status,
        };
      });

      res.json({ Attendees: formattedAttendees });
      // Private event created by current user is an attendee
    } else if (event.private && currentUser) {
      const userAttendee = await Attendee.findOne({
        where: {
          eventId: req.params.eventId,
          userId: currentUser.id,
        },
      });

      if (userAttendee && userAttendee.status === 'attending') {
        const attendees = await Attendee.findAll({
          where: {
            eventId: req.params.eventId,
          },
          include: {
            model: User,
            attributes: ['id', 'username', 'firstName', 'lastName'],
          },
        });

        const formattedAttendees = attendees.map((attendee) => {
          return {
            id: attendee.id,
            username: attendee.User.username,
            firstName: attendee.User.firstName,
            lastName: attendee.User.lastName,
            status: attendee.status,
          };
        });

        res.json({ Attendees: formattedAttendees });
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    } else {
      const attendees = await Attendee.findAll({
        where: {
          eventId: req.params.eventId,
        },
        include: {
          model: User,
          attributes: ['id', 'username', 'firstName', 'lastName'],
        },
      });

      const formattedAttendees = attendees.map((attendee) => {
        return {
          id: attendee.id,
          username: attendee.User.username,
          firstName: attendee.User.firstName,
          lastName: attendee.User.lastName,
          status: null,
        };
      });

      res.json({ Attendees: formattedAttendees });
    }
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Request to Attend an Event based on the Event's id
router.post('/:eventId/attendance', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.eventId;

  const event = await Event.findByPk(eventId);

  if (!event)
    return res.status(404).json({ message: "Event couldn't be found" });

  if (
    event.private &&
    event.maxAttendees !== null &&
    event.attendees.length >= event.maxAttendees
  ) {
    return res
      .status(400)
      .json({ message: 'Too many attendees in this event' });
  }

  if (event.private && event.maxAttendees === null) {
    const newAttendance = await Attendee.create({
      userId: userId,
      eventId: eventId,
      status: 'pending',
    });

    return res.json({ userId: userId, status: newAttendance.status });
  }

  if (
    event.private &&
    event.maxAttendees !== null &&
    event.length < event.maxAttendees
  ) {
    const existingPendingAttendance = await Attendee.findOne({
      where: {
        userId: userId,
        eventId: eventId,
        status: 'pending',
      },
    });

    if (existingPendingAttendance) {
      return res
        .status(400)
        .json({ message: 'Attendance has already been requested' });
    }

    const newAttendance = await Attendee.create({
      userId: userId,
      eventId: eventId,
      status: 'pending',
    });

    return res.json({ userId: userId, status: newAttendance.status });
  } else if (!event.private) {
    // Check if the current user is already an attendee of the event
    const existingAttendance = await Attendee.findOne({
      where: {
        userId: userId,
        eventId: eventId,
        status: 'attending',
      },
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: 'User is already an attendee of the event' });
    }

    const newAttendance = await Attendee.create({
      userId: userId,
      eventId: eventId,
      status: null,
    });
    return res.json({ userId: userId, status: newAttendance.status });
  } else {
    return res
      .status(400)
      .json({ message: 'Too many attendees in this event' });
  }
});

// Change the status of an attendance for an event specified by id
router.put(
  '/:eventId/attendance',
  requireAuth,
  isAuthorized,
  async (req, res) => {
    const eventId = req.params.eventId;
    const { userId, status } = req.body;

    const attendance = await Attendee.findOne({
      where: { userId: userId, eventId: eventId },
    });

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }

    if (status !== 'attending') {
      return res
        .status(400)
        .json({ message: 'Invalid status. Status must be "attending".' });
    }

    const event = await Event.findOne({ where: { id: eventId } });

    if (!event) {
      res.status(404).json({ message: "Event couldn't be found" });
    }

    if (attendance.status === 'pending') {
      const attendanceUpdated = await attendance.update({
        status: 'attending',
      });

      const { id, eventId, userId, status } = attendanceUpdated.toJSON();
      delete attendanceUpdated.updatedAt;
      delete attendanceUpdated.createdAt;

      try {
        await Wishlist.create({
          attendeeId: id,
          eventId,
        });
      } catch (error) {
        console.error('Error creating wishlist:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

      return res.json({ id, eventId, userId, status });
    } else if (
      attendance.status === 'waitlist' &&
      event.private &&
      event.maxAttendees !== null &&
      event.length < event.maxAttendees
    ) {
      const attendanceUpdated = await attendance.update({
        status: 'attending',
      });

      const { id, eventId, userId, status } = attendanceUpdated.toJSON();
      delete attendanceUpdated.updatedAt;
      delete attendanceUpdated.createdAt;

      try {
        await Wishlist.create({
          attendeeId: id,
          eventId,
        });
      } catch (error) {
        console.error('Error creating wishlist:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

      return res.json({ id, eventId, userId, status });
    }
  }
);

// Delete attendance to an event specified by id
router.delete(
  '/:eventId/attendance/:userId',
  requireAuth,
  isAuthorized,
  async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const userId = req.params.userId;

      const event = await Event.findOne({ where: { id: eventId } });

      if (!event) {
        res.status(404).json({ message: "Event couldn't be found" });
      }

      const attendance = await Attendee.findOne({
        where: {
          eventId: eventId,
          userId: userId,
        },
      });

      if (!attendance) {
        return res.status(404).json({ message: 'Attendance not found' });
      }

      await attendance.destroy();

      res.json({
        message: 'Successfully deleted',
      });
    } catch (error) {
      console.error('Error while deleting attendance:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
);

module.exports = router;
