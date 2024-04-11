/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const express = require('express');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const router = express.Router();
const {
  addUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
} = require('../db/db_methods');

// Middleware function to check authorization
const authorizeUser = (req, res, next) => {
  // check if the request contains a valid JWT token
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// GET /users
router.get('/', authorizeUser, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch (error) {
    next(error);
  }
});

// GET /users/:user_id
router.get('/:user_id', authorizeUser, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    // Check if the requested user_id matches with the user's own id or the admin
    if (user_id !== req.user.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const user = await getUserById(user_id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

// GET /users/:username
router.get('/:username', async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.params.username);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /users/:user_id
router.patch('/:user_id', async (req, res, next) => {
  try {
    const user = await updateUser(req.params.user_id, req.body);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:user_id
router.delete('/:user_id', async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.user_id);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

// POST /users/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' },
    );
    res.json({ message: 'Login Successful', token });
  } catch (error) {
    next(error);
  }
});

// POST /users/register
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(401).json({ message: 'Username already exists' });
    }
    const newUser = await addUser({ username, password, email });
    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
