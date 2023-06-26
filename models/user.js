const { body, validationResult } = require('express-validator');
const USER = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "", // min 3 symbols
};



exports.createUserValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('phoneNumber').matches(/^\+380\d{9}$/).withMessage('Invalid phone number'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long')
  ];
};


exports.updateUserValidationRules = () => {
  return [
    body('name').optional(),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('phoneNumber').optional().matches(/^\+380\d{9}$/).withMessage('Invalid phone number'),
    body('password').optional().isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
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
export { USER };
