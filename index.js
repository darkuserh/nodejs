import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";

import "./config/db.js";
const router = express.Router();
const { createUserValidationRules, updateUserValidationRules, validate } = require('../models/user');
const { handleResponse } = require('../middlewares/response.middleware');

router.use(handleResponse);

// GET /api/users
router.get('/', (req, res) => {
  // Реалізуйте отримання списку користувачів
  res.success(users);
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);
  if (!user) {
    res.notFoundError('User');
  } else {
    res.success(user);
  }
});

// POST /api/users
router.post('/', createUserValidationRules(), validate, (req, res) => {
  // Реалізуйте створення користувача
  const user = createUser(req.body);
  if (!user) {
    res.databaseError('Failed to create user');
  } else {
    res.success(user);
  }
});

// PUT /api/users/:id
router.put('/:id', updateUserValidationRules(), validate, (req, res) => {
  const { id } = req.params;
  const updatedUser = updateUserById(id, req.body);
  if (!updatedUser) {
    res.notFoundError('User');
  } else {
    res.success(updatedUser);
  }
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedUser = deleteUserById(id);
  if (!deletedUser) {
    res.notFoundError('User');
  } else {
    res.success(deletedUser);
  }
});

module.exports = router;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use("/", express.static("./client/build"));

const port = 3050;
app.listen(port, () => {});

export { app };
