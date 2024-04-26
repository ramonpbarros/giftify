const { handleValidationErrors } = require('./validation');
const { check } = require('express-validator');

const validateCreateEvent = [
  check('eventName')
    .exists()
    .notEmpty()
    .custom((value) => {
      if (!value.trim()) {
        throw new Error('Event name is required');
      }
      return true;
    })
    .isLength({ max: 50 })
    .withMessage('Event name must be less than 50 characters'),
  check('eventDescription')
    .exists()
    .notEmpty()
    .custom((value) => {
      if (!value.trim()) {
        throw new Error('Event description is required');
      }
      return true;
    }),

  check('eventDate')
    .exists()
    .notEmpty()
    .custom((value, { req }) => {
      if (value && new Date(value) < new Date()) {
        throw new Error('Event Date cannot be in the past');
      }
      return true;
    }),
  check('private')
    .optional()
    .exists()
    .notEmpty()
    .withMessage('Privacy status is required'),
  check('maxGiftCost')
    .optional()
    .exists()
    .isFloat({ gt: 0 })
    .custom((value, { req }) => {
      if (value < 1) {
        throw new Error('Gift cost cannot be less than $1.00');
      }
      return true;
    }),
  check('maxAttendees')
    .optional()
    .exists()
    .custom((value, { req }) => {
      if (value < 2) {
        throw new Error('Max amount of attendees cannot be less than 2');
      }
      return true;
    }),
  handleValidationErrors,
];

const validateEditEvent = [
  check('eventName')
    .optional()
    .exists()
    .isLength({ max: 50 })
    .withMessage('Event name must be less than 50 characters'),
  check('eventDescription').optional().exists(),
  check('eventDate')
    .optional()
    .exists()
    .notEmpty()
    .custom((value, { req }) => {
      if (value && new Date(value) < new Date()) {
        throw new Error('Event Date cannot be in the past');
      }
      return true;
    }),
  check('private').optional().exists(),
  check('maxGiftCost')
    .optional()
    .exists()
    .isFloat({ gt: 0 })
    .custom((value, { req }) => {
      if (value < 1) {
        throw new Error('Gift cost cannot be less than $1.00');
      }
      return true;
    }),
  check('maxAttendees')
    .optional()
    .exists()
    .custom((value, { req }) => {
      if (value < 2) {
        throw new Error('Max amount of attendees cannot be less than 2');
      }
      return true;
    }),
  handleValidationErrors,
];

const validateCreateProduct = [
  check('wishlistId')
    .exists()
    .notEmpty()
    .withMessage('Wishlist id is required')
    .isInt({ min: 1 })
    .withMessage('Wishlist id must be an integer greater than 0'),
  check('productName')
    .exists()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 50 })
    .withMessage('Product name must be less than 50 characters'),
  check('productDescription')
    .exists()
    .notEmpty()
    .withMessage('Product description is required'),
  handleValidationErrors,
];

const validateCreateWishlist = [
  check('attendeeId')
    .exists()
    .notEmpty()
    .withMessage('Attendee id is required')
    .isInt({ min: 1 })
    .withMessage('Attendee id must be an integer greater than 0'),
  check('eventId')
    .exists()
    .notEmpty()
    .withMessage('Event id is required')
    .isInt({ min: 1 })
    .withMessage('Event id must be an integer greater than 0'),
  handleValidationErrors,
];

module.exports = {
  validateCreateEvent,
  validateEditEvent,
  validateCreateProduct,
  validateCreateWishlist,
};
