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
      include: {
        model: User,
        attributes: ['username', 'firstName', 'lastName'],
      },
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

// Get all Events joined or organized by the Current User
router.get('/current', requireAuth, async (req, res) => {
  try {
    const currentUser = req.user.toJSON();

    const attendances = await Attendee.findAll({
      where: {
        userId: currentUser.id,
        status: 'attending',
      },
    });

    const eventIds = attendances.map((attendance) => attendance.eventId);


    const events = await Event.findAll({
      where: {
        id: eventIds,
      },
    });

    if (!events.length) {
      res.status(404).json({ message: 'User is not attending any events' });
      return;
    }

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

    res.json({ Events: formattedEvents });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get details of an Event specified by its id
router.get('/:eventId', requireAuth, async (req, res) => {
  const currentUser = req.user.toJSON();
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
        attendeeId: attendee.id,
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

  if (event.private && event.userId == currentUser.id) {
    formattedEvent.Attendees = attendees.map((attendee) => ({
      id: attendee.User.id,
      username: attendee.User.username,
      userId: attendee.userId,
      Wishlist: attendee.User.dataValues.Wishlist || null,
    }));
  } else if (!event.private) {
    formattedEvent.Attendees = attendees.map((attendee) => ({
      id: attendee.User.id,
      username: attendee.User.username,
      userId: attendee.userId,
      Wishlist: attendee.User.dataValues.Wishlist || null,
    }));
  }

  formattedEvent.Organizer = formattedUser;
  formattedEvent.eventDate = `${newDateEventDate}`;
  formattedEvent.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
  formattedEvent.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

  res.json(formattedEvent);
});

// Create Event
router.post('/', requireAuth, validateCreateEvent, async (req, res) => {
  const { eventName, eventDescription, eventDate } = req.body;

  const currentUser = req.user.toJSON();

  const newEvent = await Event.create({
    userId: currentUser.id,
    eventName,
    eventDescription,
    eventDate,
    private: true,
  });

  if (newEvent) {
    await Attendee.create({
      userId: currentUser.id,
      eventId: newEvent.id,
      status: 'attending',
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

    if (!event) {
      res.status(404);
      res.send({ message: "Event couldn't be found" });
    }

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

  if (!event) {
    res.status(404);
    res.send({ message: "Event couldn't be found" });
  }

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
      res.status(404).json({ message: "Event couldn't be found" });
      return;
    }

    const currentUser = req.user.toJSON();

    // Private event created by current user
    // if (event.userId === currentUser.id) {
    //   const attendees = await Attendee.findAll({
    //     where: {
    //       eventId: req.params.eventId,
    //     },
    //     include: {
    //       model: User,
    //       attributes: ['id', 'username', 'firstName', 'lastName'],
    //     },
    //   });

    //   const formattedAttendees = attendees.map((attendee) => {
    //     return {
    //       id: attendee.id,
    //       username: attendee.User.username,
    //       firstName: attendee.User.firstName,
    //       lastName: attendee.User.lastName,
    //       status: attendee.status,
    //     };
    //   });

    //   res.json({ Attendees: formattedAttendees });
    //   // Private event created by current user is an attendee
    // }
    // else
    if (event.userId === currentUser.id) {
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

  const attendances = await Attendee.findAll({
    where: {
      eventId,
    },
  });

  if (
    event.private &&
    event.maxAttendees !== null &&
    attendances.length >= event.maxAttendees
  ) {
    return res
      .status(400)
      .json({ message: 'Too many attendees in this event' });
  }

  if (event.private && event.maxAttendees === null) {
    const existingPendingAttendance = await Attendee.findOne({
      where: {
        userId,
        eventId,
        status: 'pending',
      },
    });

    if (existingPendingAttendance) {
      return res
        .status(400)
        .json({ message: 'Attendance has already been requested' });
    }
    const newAttendance = await Attendee.create({
      userId,
      eventId,
      status: 'pending',
    });

    return res.json({ userId: userId, status: newAttendance.status });
  }

  if (
    event.private &&
    event.maxAttendees !== null &&
    attendances.length < event.maxAttendees
  ) {
    const existingPendingAttendance = await Attendee.findOne({
      where: {
        userId,
        eventId,
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

    return res.json({ userId, status: newAttendance.status });
  }

  if (!event.private) {
    // Check if the current user is already an attendee of the event
    const existingAttendance = await Attendee.findOne({
      where: {
        userId,
        eventId,
        status: 'attending',
      },
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: 'User is already an attendee of the event' });
    }

    const newAttendance = await Attendee.create({
      userId,
      eventId,
      status: 'pending',
    });

    return res.json({ userId: userId, status: newAttendance.status });
  }
});

// Change the status of an attendance for an event specified by id
router.put(
  '/:eventId/attendance',
  requireAuth,
  isAuthorized,
  async (req, res) => {
    const currentUser = req.user.toJSON();
    const eventId = req.params.eventId;
    const { userId, status } = req.body;

    const event = await Event.findOne({ where: { id: eventId } });

    if (!event) {
      return res.status(404).json({ message: "Event couldn't be found" });
    }

    if (currentUser.id !== event.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const attendance = await Attendee.findOne({
      where: { userId, eventId },
    });

    if (!attendance) {
      return res.status(404).json({
        message: 'Attendance between the user and the event does not exist',
      });
    }

    if (attendance.status === status) {
      return res.status(400).json({
        message: 'User is already in the requested attendance status',
      });
    }

    if (attendance.status === 'pending') {
      const updatedAttendance = await attendance.update({
        status: 'attending',
      });

      formattedAttendance = updatedAttendance.toJSON();

      delete formattedAttendance.createdAt;
      delete formattedAttendance.updatedAt;

      try {
        await Wishlist.create({
          attendeeId: updatedAttendance.id,
          eventId,
        });
      } catch (error) {
        console.error('Error creating wishlist:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.json(formattedAttendance);
    }
    // Waitlist implementation coming soon!
    // The idea is that for public events with maxed out attendance, users can be put on a waitlist status.
    // If someone drops out of the event, they can be added from the waitlist.

    // if (
    //   attendance.status === 'waitlist' &&
    //   event.private &&
    //   event.maxAttendees !== null &&
    //   attendance.length < event.maxAttendees
    // ) {
    //   const attendanceUpdated = await attendance.update({
    //     status: 'attending',
    //   });

    //   const { id, eventId, userId, status } = attendanceUpdated.toJSON();
    //   delete attendanceUpdated.updatedAt;
    //   delete attendanceUpdated.createdAt;

    //   try {
    //     await Wishlist.create({
    //       attendeeId: id,
    //       eventId,
    //     });
    //   } catch (error) {
    //     console.error('Error creating wishlist:', error);
    //     return res.status(500).json({ message: 'Internal server error' });
    //   }

    //   return res.json({ id, eventId, userId, status });
    // }
  }
);

// Delete attendance to an event specified by id
router.delete('/:eventId/attendance/:userId', requireAuth, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.params.userId;
    const currentUser = req.user.toJSON();

    if (userId == currentUser.id) {
      const event = await Event.findOne({ where: { id: eventId, userId } });

      if (!event) {
        return res.status(404).json({ message: "Event couldn't be found" });
      }
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const attendance = await Attendee.findOne({
      where: {
        eventId: eventId,
        userId: userId,
      },
    });

    if (!attendance) {
      res.status(404).json({ message: 'Attendance not found' });
    }

    await attendance.destroy();

    return res.json({
      message: 'Successfully deleted',
    });
  } catch (error) {
    console.error('Error while deleting attendance:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
