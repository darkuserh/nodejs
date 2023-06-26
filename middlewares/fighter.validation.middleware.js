import { body, validationResult } from 'express-validator';
import { FIGHTER } from "../models/fighter.js";

const createFighterValid = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('power').isInt({ min: 1, max: 100 }).withMessage('Invalid power value'),
    body('defense').isInt({ min: 1, max: 10 }).withMessage('Invalid defense value'),
  ];
};

const updateFighterValid = () => {
  return [
    body('name').optional(),
    body('power').optional().isInt({ min: 1, max: 100 }).withMessage('Invalid power value'),
    body('defense').optional().isInt({ min: 1, max: 10 }).withMessage('Invalid defense value'),
  ];
};

const validateFighter = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map(error => error.msg);
  res.status(400).json({ error: true, message: errorMessages });
};

export { createFighterValid, updateFighterValid, validateFighter };