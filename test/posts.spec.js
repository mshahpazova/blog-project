const {expect} = require('chai');
const {describe, it, after, before} = require('mocha');
const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);

const API = '/api/posts';
const AUTH = '/authentication';
const {validPost} = require('./dummies/posts');
const {validUser} = require('./dummies/users');
const {Post, User, Comment} = require('../models');
const {hash} = require('../utils/auth');
const {RECORD_NOT_FOUND} = require('../utils/messages');

let id;
let userId;
let postWithCommentsId;

describe('/api/posts', () => {
  before(done => {
    const data = Object.assign({}, validUser, {hash: hash(validUser.password)});

    User.create(data).then(user => {
      userId = user.id;
      const {username, password} = validUser;
      agent.post(`${AUTH}/signin`)
        .send({username, password})
        .end(done);
    }).catch(done);
  });

  it('should create a post', done => {
    agent.post(`${API}`).send(validPost)
    .end((err, {body, status}) => {
      expect(status).to.equal(200);
      expect(body).to.exist;
      expect(body.authorId).to.equal(userId);
      Post.find({where: {text: validPost.text}, include: [{
        model: User,
        as: 'author'
      }]})
      .then(post => {
        id = post.id;
        expect(post).to.exist;
        expect(post.author.username).to.equal(validUser.username);
        done();
      });
    });
  });

  it('should create post and not change owner', done => {
    const data = Object.assign({ownerId: 5000}, validUser);
    agent.post(`${API}`).send(data)
    .end((err, {body, status}) => {
      expect(status).to.equal(200);
      expect(body).to.exist;
      expect(body.authorId).to.not.equal(data.ownerId);
      expect(body.authorId).to.equal(userId);
      done();
    });
  });

  it('should update a post', done => {
    const text = 'testing';
    agent.put(`${API}/${id}`).send({text})
    .end((err, {body, status}) => {
      expect(status).to.equal(200);
      expect(body.text).to.exist;
      expect(body.text).to.equal(text);
      Post.findById(body.id).then(post => {
        expect(post).to.exist;
        expect(body.text).to.equal(text);
        done();
      });
    });
  });

  it('should get 404 for trying to update a missing post', done => {
    const text = 'testing';
    agent.put(`${API}/4141`).send({text})
    .end((err, {body, status}) => {
      expect(status).to.equal(404);
      expect(body.message).to.equal(RECORD_NOT_FOUND);
      done();
    });
  });

  it('should get 404 for a missing post', done => {
    agent.get(`${API}/1999`)
    .end((err, {body, status}) => {
      expect(status).to.equal(404);
      expect(body.message).to.equal(RECORD_NOT_FOUND);
      done();
    });
  });

  it('should get a post', done => {
    agent.get(`${API}/${id}`)
    .end((err, {status}) => {
      expect(status).to.equal(200);
      done();
    });
  });

  it('should get all posts', done => {
    agent.get(`${API}`).send(validPost)
    .end((err, {body, status}) => {
      expect(status).to.equal(200);
      expect(body).to.exist;
      expect(body instanceof Array).to.equal(true);
      done();
    });
  });

  it('should delete a post', done => {
    let idToDelete;
    Post.create(validPost)
    .then(post => idToDelete = post.id)
    .then(() => agent.delete(`${API}/${idToDelete}`))
    .then(({status}) => {
      expect(status).to.equal(204);
      Post.findById(idToDelete).then(post => {
        expect(post).to.not.exist;
        done();
      });
    });
  });

  it('should get 404 for trying to delete a non-existent post', done => {
    agent.delete(`${API}/4000`)
    .end((err, {body, status}) => {
      expect(status).to.equal(404);
      expect(body.message).to.equal(RECORD_NOT_FOUND);
      done();
    });
  });

  it('should add a comment to a post', done => {
    Post.create({text: 'lorem'}).then(post => {
      postWithCommentsId = post.id;
      agent.post(`${API}/${post.id}/comments`)
        .send({text: 'lorem too!'})
        .end((err, {body, status}) => {
          expect(status).to.equal(200);
          expect(body.authorId).to.equal(userId);
          Comment.findById(body.id, {
            include: [{model: Post, as: 'post'}]
          }).then(comment => {
            expect(comment.id).to.equal(body.id);
            expect(comment.authorId).to.equal(userId);
            expect(comment.post.text).to.equal(post.text);
            expect(comment.post.id).to.equal(post.id);
            done();
          });
        });
    });
  });

  it('should get comments of a post', done => {
    agent.get(`${API}/${postWithCommentsId}/comments`)
    .end((err, {body, status}) => {
      expect(status).to.equal(200);
      expect(body instanceof Array).to.equal(true);
      body.forEach(comment => {
        expect(comment).to.contain.all.keys(['id', 'text', 'postId']);
        expect(comment.postId).to.equal(postWithCommentsId);
      });
      done();
    });
  });

  it('should delete post and its comments', done => {
    Post.findById(postWithCommentsId).then(post => {

      agent.delete(`${API}/${postWithCommentsId}`)
      .end((err, {status}) => {
        expect(status).to.equal(204);
        post.getComments().then(comments => {
          expect(comments).to.be.empty;
          done();
        });
      });
    });
  });
  after(done => {
    User.destroy({where: {}}).then(() => done());
  });
});
