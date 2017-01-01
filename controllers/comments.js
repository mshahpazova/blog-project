const {Comment, User} = require('../models');
const {handleMissing} = require('../utils/handlers');

class CommentsController {

  create(req, res, next) {
    req.body.authorId = req.session.user.id;
    Comment.create(req.body)
      .then(comment => res.json(comment))
      .catch(err => next(err, req, res));
  }

  update(req, res, next) {
    const data = Object.assign({}, req.body, {
      authorId: req.session.user.id
    });

    Comment.findById(req.params.id)
      .then(handleMissing)
      .then(comment => comment.updateAttributes(data))
      .then(comment => res.json(comment))
      .catch(next);
  }

  get(req, res, next) {
    Comment.findById(req.params.id)
      .then(handleMissing)
      .then(comment => res.json(comment))
      .catch(next);
  }

  delete(req, res, next) {
    Comment.findById(req.params.id)
      .then(handleMissing)
      .then(comment => comment.destroy())
      .then(() => res.sendStatus(204))
      .catch(next);
  }

  getReplies(req, res, next) {
    const {parentId} = req.params;
    Comment.findAll({
      where: {parentId},
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'firstName', 'lastName']
      }]
    })
    .then(replies => res.json(replies))
    .catch(err => next(err, req, res));
  }

  reply(req, res, next) {
    const {parentId} = req.params;
    const authorId = req.session.user.id;
    const data = Object.assign(req.body, {parentId, authorId});
    Comment.create(data)
           .then(comment => res.json(comment))
           .catch(err => next(err, req, res));
  }
}

module.exports = new CommentsController();
