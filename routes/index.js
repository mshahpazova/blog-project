'use strict';
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const authentication = require('./authentication');
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

router.use('/example', (req, res) => res.json({message: 'Hello there!'}));

router.all('/api/*', (req, res, next) => _.has(req, 'session.user') ? next() : res.sendStatus(401));
router.use('/authentication', authentication);
router.use('/api/users', users);
router.use('/api/posts', posts);
router.use('/api/comments', comments);

module.exports = router;
