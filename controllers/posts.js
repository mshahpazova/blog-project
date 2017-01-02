'use strict';
const {Post, Comment} = require('../models');
const {handleMissing} = require('../utils/handlers');
const _ = require('lodash');


class PostsController {
  getAll(req, res, next) {
    Post.findAll()
    .then(posts => res.json(posts))
    .catch(err => next(err, req, next));
  }

  create(req, res, next) {
    req.body.authorId = req.session.user.id;
    Post.create(req.body)
    .then(post => res.json(post))
    .catch(next);
  }

  get(req, res, next) {
    Post.findById(req.params.id, {
      include: [
        {association: Post.associations.author},
        {
          association: Post.associations.comments,
          // order: [['createdAt', 'ASC']],
          include: [{
            association: Comment.associations.author
          }]
        }
      ]
    })
    .then(handleMissing)
    .then(post => Object.assign(post.toJSON(), {
      comments: _.orderBy(post.comments, comment => new Date(comment.createdAt), ['desc'])
    }))
    .then(post => res.json(post))
    .catch(next);
  }

  update(req, res, next) {
    Post.findById(req.params.id)
      .then(handleMissing)
      .then(post => post.updateAttributes(req.body))
      .then(post => res.json(post))
      .catch(next);
  }

  delete(req, res, next) {
    Post.findById(req.params.id).then(handleMissing)
    .then(post => post.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
  }

  comment(req, res, next) {
    const data = Object.assign(req.body, {
      postId: req.params.postId,
      authorId: req.session.user.id
    });
    Comment.create(data, {
      include: [{ association: Comment.associations.author }]
    })
   .then(comment => comment.reload({
      include: {
        association: Comment.associations.author
      }
    }))
   .then(comment => res.json(comment))
   .catch(err => next(err, req, res));
  }

  getComments(req, res, next) {
    Post.findById(req.params.postId, {
      include: [{
        association: Post.associations.comments,
        include: [{association: Post.associations.author}]
      }]
    })
    .then(handleMissing)
    .then(({comments}) => res.json(comments))
    .catch(next);
  }
}

module.exports = new PostsController();
