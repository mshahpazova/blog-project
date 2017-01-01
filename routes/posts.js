'use strict';
const express = require('express');
const ctrl = require('../controllers/posts');

const router = express.Router();

router
  .get('/', ctrl.getAll)
  .post('/', ctrl.create)
  .get('/:id', ctrl.get)
  .put('/:id', ctrl.update)
  .delete('/:id', ctrl.delete)
  .get('/:postId/comments', ctrl.getComments)
  .post('/:postId/comments', ctrl.comment);

module.exports = router;
