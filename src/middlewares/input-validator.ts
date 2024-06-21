const { check, validationResult } = require('validator');

const validateRegister = [
  check('username').trim().escape().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  check('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

module.exports = validateRegister;