const RecordNotFoundError = require('../errors/recordNotFound');
const AuthorizationError = require('../errors/authorizationError');
const _ = require('lodash');

module.exports = {
  handleMissing(record) {
    if (record === null) {
      throw new RecordNotFoundError();
    }
    return record;
  },

  handleNotYours(record, req, id) {
    if (req.session.user.id.toString() !== id.toString()) {
      throw new AuthorizationError();
    }
    return record;
  },

  handleAdmin(id, organization) {
    const found = _.find(organization.administrators, {id});
    if (!found) {
      throw new AuthorizationError();
    }
    return organization;
  }
};
