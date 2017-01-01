'use strict';
const {NOT_AUTHORIZED} = require('../utils/messages');

class AuthorizationError extends Error {
  constructor(message = NOT_AUTHORIZED) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

module.exports = AuthorizationError;
