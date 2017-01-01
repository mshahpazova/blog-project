'use strict';
const {User} = require('../models');
const {hash} = require('../utils/auth');
const _ = require('lodash');
const {handleMissing} = require('../utils/handlers');
const messages = require('../utils/messages');

class UserController {
  signup(req, res, next) {
    const { email, password, firstName, lastName } = req.body;
    const hashed = hash(password);
    const data = Object.assign({}, req.body, { hash: hashed });

    if (req.session.user) {
      return res.status(500).json({message: messages.ALREADY_SIGNED});
    }

    User.create(Object.assign(data))
      .then(() => res.json({firstName, lastName, email}))
      .catch(next);
  }

  getCurrent(req, res) {
    if (!_.has(req, 'session.user')) {
      return res.status(404).json({message: messages.NOT_FOUND});
    }

    return User.findById(req.session.user.id)
      .then(user => {
        if (!user) {
          // there's an old user which has been deleted cached in session
          req.session = null;
          return res.status(404).json({ message: messages.NOT_FOUND });
        }
        return res.json(user);
      });
  }

  signin(req, res, next) {
    const {username, password} = req.body;
    const email = username;
    const hashed = hash(password.toString() || '');
    User.findOne({
      where: {
        $or: [
          {username},
          {email}
        ]
      }
    })
    .then(handleMissing)
    .then(user => {
      if (hashed !== user.hash) {
        return res.status(403).json({ message: messages.WRONG_PASSWORD });
      }

      req.session.user = user.toJSON();
      res.json(user);
    })
    .catch(next);
  }

  signout(req, res) {
    req.session = null;
    res.cookie('connect.sid', '', { expires: new Date(1), path: '/' });
    res.clearCookie('connect.sid', { path: '/' });
    res.sendStatus(204);
  }
}

module.exports = new UserController();
