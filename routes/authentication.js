'use strict';
const express = require('express');
const router = express.Router();
const { signup, signin, signout, getCurrent} = require('../controllers/authentication');

router
  .get('/current', getCurrent)
  .post('/signup', signup)
  .post('/signin', signin)
  .post('/signout', signout);

module.exports = router;
