'use strict';
const _ = require('lodash');
const {User, Post} = require('../models');
const {handleMissing, handleNotYours} = require('../utils/handlers');
const AuthorizationError = require('../errors/authorizationError');
const {badUserAttributes} = require('../constants/attributes');

class UsersController {
  getAll(req, res, next) {
    return User.findAll()
      .then(users => res.json(users))
      .catch(err => next(err, req, res));
  }

  get(req, res, next) {
    return User.findById(req.params.id)
      .then(handleMissing)
      .then(user => res.json(user))
      .catch(err => next(err, req, res));
  }

  update(req, res, next) {
    const data = _.omit(req.body, badUserAttributes);
    const {id} = req.session.user;

    if (req.params.id !== id.toString()) {
      throw new AuthorizationError();
    }

    User.findById(id)
        .then(handleMissing)
        .then(user => user.update(data))
        .then(user => res.json(user))
        .catch(err => next(err, req, res));
  }

  getPosts(req, res, next) {
    Post.findAll({where: {
      authorId: req.params.id
    }})
    .then(posts => res.json(posts))
    .catch(next);
  }

  createPost(req, res, next) {
    handleNotYours(null, req, req.params.id);
    Post.create(Object.assign(req.body, {authorId: req.session.user.id}))
    .then(post => res.json(post))
    .catch(next);
  }
}

module.exports = new UsersController();
