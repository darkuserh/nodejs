import { body, validationResult } from 'express-validator';
import { USER } from "../models/user.js";

const createUserValid = () => {
  return [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required').matches(/^\+380\d{9}$/).withMessage('Invalid phone number format'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 3 }).withMessage('Password should have at least 3 characters'),
  ];
};

const updateUserValid = () => {
  return [
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('phoneNumber').optional().matches(/^\+380\d{9}$/).withMessage('Invalid phone number format'),
    body('password').optional().isLength({ min: 3 }).withMessage('Password should have at least 3 characters'),
  ];
};

const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map(error => error.msg);
  res.status(400).json({ error: true, message: errorMessages });
};

export { createUserValid, updateUserValid, validateUser };
