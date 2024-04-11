const express = require('express');
const { requireAuth, isAuthorized } = require('../../utils/auth');
const { Attendee, Wishlist, Event } = require('../../db/models');

const router = express.Router();

// Get all Wishlists from current user
router.get('/', requireAuth, async (req, res) => {
  try {
    const currentUser = req.user.toJSON();

    const wishlists = await Wishlist.findAll({
      include: [{ model: Attendee }],
    });

    let formattedWishlists = [];

    wishlists.forEach((wishlist) => {
      if (wishlist.Attendee && wishlist.Attendee.userId === currentUser.id) {
        formattedWishlists.push({
          id: wishlist.id,
          attendeeId: wishlist.Attendee.id,
          eventId: wishlist.Attendee.eventId,
          createdAt: new Date(wishlist.createdAt)
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, ''),
          updatedAt: new Date(wishlist.updatedAt)
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, ''),
        });
      }
    });

    res.json({ Wishlists: formattedWishlists });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a Wishlist by ID
router.get('/:wishlistId', requireAuth, async (req, res) => {
  try {
    const currentUser = req.user.toJSON();
    const wishlist = await Wishlist.findByPk(req.params.wishlistId, {
      include: [{ model: Attendee }],
    });

    if (!wishlist) {
      res.status(404);
      res.send({ message: "Wishlist couldn't be found" });
    }

    let formattedWishlist = {};

    if (wishlist.Attendee && wishlist.Attendee.userId === currentUser.id) {
      formattedWishlist.id = wishlist.id;
      formattedWishlist.attendeeId = wishlist.Attendee.id;
      formattedWishlist.eventId = wishlist.Attendee.eventId;
      formattedWishlist.createdAt = new Date(wishlist.createdAt)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      formattedWishlist.updatedAt = new Date(wishlist.updatedAt)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
    } else {
      res.status(403);
      res.send({ message: 'Forbidden' });
    }

    res.json(formattedWishlist);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a Wishlist
router.post('/', requireAuth, async (req, res) => {});

module.exports = router;
