const { handleValidationErrors } = require('./validation');
const { check } = require('express-validator');

const validateCreateEvent = [
  check('eventName')
    .exists()
    .notEmpty()
    .withMessage('Event name is required')
    .isLength({ max: 50 })
    .withMessage('Event name must be less than 50 characters'),
  check('eventDescription')
    .exists()
    .notEmpty()
    .withMessage('Event description is required'),
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
    .notEmpty()
    .withMessage('Event name is required')
    .isLength({ max: 50 })
    .withMessage('Event name must be less than 50 characters'),
  check('eventDescription')
    .optional()
    .exists()
    .notEmpty()
    .withMessage('Event description is required'),
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

module.exports = {
  validateCreateEvent,
  validateEditEvent,
};
