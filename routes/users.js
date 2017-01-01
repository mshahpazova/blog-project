'use strict';
const express = require('express');
const ctrl = require('../controllers/users');
const router = express.Router();

router.get('/', ctrl.getAll)
      .get('/:id', ctrl.get)
      .put('/:id', ctrl.update)
      .get('/:id/posts', ctrl.getPosts)
      .post('/:id/posts', ctrl.createPost);

module.exports = router;
