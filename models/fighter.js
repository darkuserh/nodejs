const { body, validationResult } = require('express-validator');
const FIGHTER = {
  id: "",
  name: "",
  health: 100,
  power: 0,
  defense: 1, // 1 to 10
};


exports.createFighterValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('power').isInt({ min: 1, max: 100 }).withMessage('Invalid power value'),
    body('defense').isInt({ min: 1, max: 10 }).withMessage('Invalid defense value'),
  ];
};

exports.updateFighterValidationRules = () => {
  return [
    body('name').optional(),
    body('power').optional().isInt({ min: 1, max: 100 }).withMessage('Invalid power value'),
    body('defense').optional().isInt({ min: 1, max: 10 }).withMessage('Invalid defense value'),
  ];
};


exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map(error => error.msg);
  res.status(400).json({ error: true, message: errorMessages });
};
export { FIGHTER };
