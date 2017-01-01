'use strict';
const {RECORD_NOT_FOUND} = require('../utils/messages');

class RecordNotFoundError extends Error {
  constructor(message = RECORD_NOT_FOUND) {
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

module.exports = RecordNotFoundError;
