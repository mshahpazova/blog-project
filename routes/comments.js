'use strict';
const express = require('express');
const ctrl = require('../controllers/comments');
const router = express.Router();

router.post('', ctrl.create)
      .put('/:id', ctrl.update)
      .get('/:id', ctrl.get)
      .delete('/:id', ctrl.delete)
      .post('/:parentId/replies', ctrl.reply)
      .get('/:parentId/replies', ctrl.getReplies);

module.exports = router;
