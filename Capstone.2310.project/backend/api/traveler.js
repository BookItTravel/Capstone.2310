const express = require('express');

const router = express.Router();
const { addTraveler } = require('../db/db_methods');

router.post('/', async (req, res, next) => {
  try {
    const {
      firstname, lastname, date_of_birth, passportNumber,
    } = req.body;
    const traveler = await addTraveler({
      firstname, lastname, date_of_birth, email, passportNumber, user_id,
    });
    if (traveler) {
      res.send(traveler);
    } else {
      next({
        name: 'Your traveler was not added successfully',
      });
    }
  } catch (error) {
    next(error);
  }
});
