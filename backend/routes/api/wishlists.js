const express = require('express');
const { requireAuth, isAuthorized } = require('../../utils/auth');
const { Attendee, Wishlist, Product } = require('../../db/models');
const { validateCreateProduct } = require('../../utils/sequelize-validations');

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
router.post('/', requireAuth, async (req, res) => {
  try {
    const { attendeeId, eventId } = req.body;

    const newWishlist = await Wishlist.create({
      attendeeId,
      eventId,
    });

    let formattedWishlist = newWishlist.toJSON();

    const newTimeUpdatedAt = new Date(formattedWishlist.updatedAt)
      .toISOString()
      .split('')
      .slice(11, 19)
      .join('');

    const newDateUpdatedAt = new Date(formattedWishlist.updatedAt)
      .toISOString()
      .split('T')[0];

    const newTimeCreatedAt = new Date(formattedWishlist.createdAt)
      .toISOString()
      .split('')
      .slice(11, 19)
      .join('');

    const newDateCreatedAt = new Date(formattedWishlist.createdAt)
      .toISOString()
      .split('T')[0];

    delete formattedWishlist.createdAt;
    delete formattedWishlist.updatedAt;

    formattedWishlist.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
    formattedWishlist.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

    res.status(201).json(formattedWishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a Wishlist
router.delete('/:wishlistId', isAuthorized, async (req, res) => {
  try {
    const wishlistId = req.params.wishlistId;

    const wishlist = await Wishlist.findOne({ where: { id: wishlistId } });

    if (!wishlist) {
      res.status(404).json({ message: "Wishlist couldn't be found" });
    }

    await wishlist.destroy();

    res.json({
      message: 'Successfully deleted',
    });
  } catch (error) {
    console.error('Error while deleting wishlist:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all Products in a Wishlist
router.get('/:wishlistId/products', requireAuth, async (req, res) => {
  try {
    const currentUser = req.user.toJSON();
    const wishlistId = req.params.wishlistId;

    const wishlist = await Wishlist.findOne({
      where: {
        id: wishlistId,
      },
    });

    if (!wishlist) {
      res.status(404);
      res.send({ message: "Wishlist couldn't be found" });
    }

    const attendee = await Attendee.findByPk(wishlist.attendeeId);

    if (attendee.userId !== currentUser.id) {
      const err = new Error();
      err.message = 'Forbidden';
      err.status = 403;
      return next(err);
    }

    const products = await Product.findAll({
      where: {
        wishlistId,
      },
    });

    if (!products) {
      res.status(404);
      res.send({ message: "Product couldn't be found" });
    }

    const formattedProducts = products.map((product) => {
      const formattedProduct = product.toJSON();

      const newTimeUpdatedAt = new Date(formattedProduct.updatedAt)
        .toISOString()
        .split('')
        .slice(11, 19)
        .join('');

      const newDateUpdatedAt = new Date(formattedProduct.updatedAt)
        .toISOString()
        .split('T')[0];

      const newTimeCreatedAt = new Date(formattedProduct.createdAt)
        .toISOString()
        .split('')
        .slice(11, 19)
        .join('');

      const newDateCreatedAt = new Date(formattedProduct.createdAt)
        .toISOString()
        .split('T')[0];

      delete formattedProduct.createdAt;
      delete formattedProduct.updatedAt;

      formattedProduct.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
      formattedProduct.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

      return formattedProduct;
    });

    res.json({ Products: formattedProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a Product by ID
router.get('/products/:productId', requireAuth, async (req, res) => {
  try {
    const currentUser = req.user.toJSON();
    const productId = req.params.productId;

    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404);
      res.send({ message: "Product couldn't be found" });
    }

    const wishlist = await Wishlist.findOne({
      where: {
        id: product.wishlistId,
      },
    });

    const attendee = await Attendee.findByPk(wishlist.attendeeId);

    if (attendee.userId !== currentUser.id) {
      const err = new Error();
      err.message = 'Forbidden';
      err.status = 403;
      return next(err);
    }

    const formattedProduct = product.toJSON();
    const newTimeUpdatedAt = new Date(formattedProduct.updatedAt)
      .toISOString()
      .split('')
      .slice(11, 19)
      .join('');

    const newDateUpdatedAt = new Date(formattedProduct.updatedAt)
      .toISOString()
      .split('T')[0];

    const newTimeCreatedAt = new Date(formattedProduct.createdAt)
      .toISOString()
      .split('')
      .slice(11, 19)
      .join('');

    const newDateCreatedAt = new Date(formattedProduct.createdAt)
      .toISOString()
      .split('T')[0];

    delete formattedProduct.createdAt;
    delete formattedProduct.updatedAt;

    formattedProduct.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
    formattedProduct.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

    res.json(formattedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a Product in a Wishlist
router.post(
  '/:wishlistId/products',
  requireAuth,
  validateCreateProduct,
  async (req, res) => {
    const currentUser = req.user.toJSON();
    const wishlistId = req.params.wishlistId;

    const wishlist = await Wishlist.findOne({
      where: {
        id: wishlistId,
      },
    });

    const attendee = await Attendee.findByPk(wishlist.attendeeId);

    if (attendee.userId !== currentUser.id) {
      const err = new Error();
      err.message = 'Forbidden';
      err.status = 403;
      return next(err);
    }

    const {
      productName,
      productDescription,
      productImageUrl,
      productPrice,
      productLink,
    } = req.body;

    const newProduct = await Product.create({
      productName,
      productDescription,
      productImageUrl,
      productPrice,
      productLink,
    });

    let formattedProduct = newProduct.toJSON();

    const newTimeUpdatedAt = new Date(formattedProduct.updatedAt)
      .toISOString()
      .split('')
      .slice(11, 19)
      .join('');

    const newDateUpdatedAt = new Date(formattedProduct.updatedAt)
      .toISOString()
      .split('T')[0];

    const newTimeCreatedAt = new Date(formattedProduct.createdAt)
      .toISOString()
      .split('')
      .slice(11, 19)
      .join('');

    const newDateCreatedAt = new Date(formattedProduct.createdAt)
      .toISOString()
      .split('T')[0];

    delete formattedProduct.createdAt;
    delete formattedProduct.updatedAt;

    formattedProduct.createdAt = `${newDateCreatedAt} ${newTimeCreatedAt}`;
    formattedProduct.updatedAt = `${newDateUpdatedAt} ${newTimeUpdatedAt}`;

    res.status(201).json(formattedProduct);
  }
);

// Update a Product in a Wishlist
router.put(
  '/:wishlistId/products/:productId',
  requireAuth,
  validateCreateProduct,
  async (req, res) => {
    const productId = req.params.productId;
    const wishlistId = req.params.wishlistId;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const wishlist = await Wishlist.findOne({
      where: {
        id: wishlistId,
      },
    });

    const attendee = await Attendee.findByPk(wishlist.attendeeId);

    if (attendee.userId !== currentUser.id) {
      const err = new Error();
      err.message = 'Forbidden';
      err.status = 403;
      return next(err);
    }

    const updatedProduct = await product.update(req.body);

    res.json(updatedProduct);
  }
);

// Delete a Product from a Wishlist
router.delete(
  '/:wishlistId/products/:productId',
  requireAuth,
  async (req, res) => {
    const wishlistId = req.params.wishlistId;
    const productId = req.params.productId;

    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).json({ message: "Product couldn't be found" });
    }

    const wishlist = await Wishlist.findByPk(wishlistId);

    if (!wishlist) {
      res.status(404).json({ message: "Wishlist couldn't be found" });
    }

    const attendee = await Attendee.findByPk(wishlist.attendeeId);

    if (attendee.userId !== currentUser.id) {
      const err = new Error();
      err.message = 'Forbidden';
      err.status = 403;
      return next(err);
    }

    await product.destroy();

    res.json({
      message: 'Successfully deleted',
    });
  }
);

module.exports = router;
