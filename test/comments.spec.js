const {expect} = require('chai');
const {describe, it, after, before} = require('mocha');
const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);
const API = '/api/comments';
const AUTH = '/authentication';
const {validUser} = require('./dummies/users');
const {User, Comment, Post} = require('../models');
const {hash} = require('../utils/auth');
const {RECORD_NOT_FOUND} = require('../utils/messages');

let id;
let userId;

describe('/api/comments', () => {
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

  it('should create a comment', done => {
    agent.post(`${API}`).send({text: 'bla'})
    .end((err, {body, status}) => {
      expect(status).to.equal(200);
      expect(body).to.not.be.undefined;
      expect(body.authorId).to.equal(userId);
      Comment.find({where: {text: 'bla'}, include: [{
        model: User,
        as: 'author'
      }]}).then(comment => {
        id = comment.id;
        expect(comment.text).to.equal('bla');
        expect(comment).to.not.be.undefined;
        expect(comment.author.username).to.equal(validUser.username);
        done();
      });
    });
  });

  it('should give 404 for trying to update missing comment', done => {
    const text = 'testing';
    agent.put(`${API}/55515`).send({text})
    .end((err, {body, status}) => {
      expect(status).to.equal(404);
      expect(body.message).to.equal(RECORD_NOT_FOUND);
      done();
    });
  });

  it('should update a comment', done => {
    const text = 'testing';
    agent.put(`${API}/${id}`).send({text})
    .end((err, {body, status}) => {
      expect(status).to.equal(200);
      expect(body.text).to.not.be.undefined;
      expect(body.text).to.equal(text);
      Comment.findById(body.id).then(comment => {
        expect(comment).to.not.be.undefined;
        expect(body.text).to.equal(text);
        done();
      });
    });
  });

  it('should give 404 for trying to get a missing comment', done => {
    agent.get(`${API}/10001`)
    .end((err, {body, status}) => {
      expect(status).to.equal(404);
      expect(body.message).to.equal(RECORD_NOT_FOUND);
      done();
    });
  });

  it('should get a comment', done => {
    agent.get(`${API}/${id}`)
    .end((err, {status}) => {
      expect(status).to.equal(200);
      done();
    });
  });

  it('should add a reply to a comment', done => {
    Comment.create({text: 'Member Star wars?'}).then(comment => {
      agent.post(`${API}/${comment.id}/replies`)
      .send({text: 'I member!'})
      .end((err, {body, status}) => {
        expect(status).to.equal(200);
        expect(body.authorId).to.equal(userId);
        comment.getReplies({where: {id: body.id}}).then(replies => {
          expect(replies[0].id).to.equal(body.id);
          expect(replies[0].text).to.equal(body.text);
          return replies[0].getParent();
        })
        .then(parent => {
          expect(parent.id).to.equal(comment.id);
          expect(parent.text).to.equal(comment.text);
          done();
        });
      });
    });
  });

  it('should get comment\'s replies', done => {
    agent.get(`${API}/${id}/replies`).end((err, {body, status}) => {
      expect(status).to.equal(200);
      expect(body instanceof Array).to.equal(true);
      body.forEach(reply => {
        expect(reply).to.contain.all.keys(['id', 'text']);
        expect(reply.parentId).to.equal(id);
      });
      done();
    });
  });

  it('should delete a comment', done => {
    let idToDelete;
    Comment.create({
      text: 'dsadsadas',
      authorId: userId
    })
    .then(comment => idToDelete = comment.id)
    .then(() => agent.delete(`${API}/${idToDelete}`))
    .then(({status}) => {
      expect(status).to.equal(204);
      Comment.findById(idToDelete).then(comment => {
        expect(comment).to.not.exist;
        done();
      });
    });
  });

  after(done => {
    const where = {where: {}};
    const promises = [User, Comment, Post].map(model => model.destroy(where));
    Promise.all(promises).then(() => done());
  });
});
