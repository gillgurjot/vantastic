const { body } = require('express-validator');

const registerValidation = [
  body('fullName', 'Please enter a valid full name').isLength({ min: 1 }),
  body('username', 'Name must contain atleast 2 characters').isLength({ min: 2 }),
  body('password', 'Password field is required').isLength({ min: 1 }),
];

const loginValidation = [
  body('username', 'Please enter a valid username').isLength({ min: 1 }),
  body('password', 'Password feild cannot be empty').isLength({ min: 1 }),
];

const jobValidation = [
  body('barber', 'Please select a barber').isLength({ min: 1 }),
  body('name', 'Please enter a valid name').isLength({ min: 1 }),
  body('address', 'Please enter a valid address').isLength({ min: 1 }),
  body('date', 'Please enter a valid date').isLength({ min: 1 }),
  body('from', 'Please enter a valid from time').isLength({ min: 1 }),
  body('to', 'Please enter a valid to time').isLength({ min: 1 }),
  body('service', 'Please select a service').isLength({ min: 1 }),
  body('phone', 'Please enter a valid phone number').isLength({ min: 1 }).isNumeric(),
];

module.exports = { registerValidation, loginValidation, jobValidation };
