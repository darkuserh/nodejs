const responseMiddleware = (req, res, next) => {
  const { validationResult } = require('express-validator');

  exports.handleResponse = (req, res, next) => {
    res.success = (data) => {
      res.status(200).json(data);
    };
  
    res.error = (statusCode, message) => {
      res.status(statusCode).json({ error: true, message });
    };
  
    res.validationError = () => {
      const errors = validationResult(req);
      const errorMessages = errors.array().map(error => error.msg);
      res.status(400).json({ error: true, message: errorMessages });
    };
  
    res.notFoundError = (entityName) => {
      res.status(404).json({ error: true, message: `${entityName} not found` });
    };
  
    res.databaseError = (message) => {
      res.status(500).json({ error: true, message });
    };
  
    next();
  };
};

export { responseMiddleware };
