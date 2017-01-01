const {expect} = require('chai');
const {describe, it, after, before} = require('mocha');
const API = '/authentication';
const {validUser} = require('./dummies/users');
const {User} = require('../models');
const {hash} = require('../utils/auth');

const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);

describe('/api/authentication', () => {
  before(done => {
    User.destroy({where: {}}).then(() => done());
  });

  describe('signup', () => {
    it('should signup a user', done => {
      agent.post(`${API}/signup`)
      .send(validUser)
      .end((err, {body, status}) => {
        expect(status).to.equal(200);
        expect(body).to.exist;
        User.find({where: {email: body.email}}).then(user => {
          expect(user.email).to.equal(body.email);
          done();
        });
      });
    });

    // it('should be already created', done => {
    //   agent.post(`${API}/signup`).send(validUser)
    //   .end((err, {status}) => {
    //     expect(status).to.equal(400);
    //     done();
    //   });
    // });
  });

  describe('signin and current', () => {

    it('should give status 404 for the current user', done => {
      agent.get(`${API}/current`).end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should signin', done => {
      User.destroy({where: {}})
      .then(() => {
        const data = Object.assign({}, validUser, {hash: hash('123')});
        return User.create(data);
      })
      .then(() => {
        const [username, password] = ['gogo1', '123'];
        return agent.post(`${API}/signin`).send({username, password});
      })
      .then(() => {
        const [username, password] = ['gogo1', '123'];
        return agent.post(`${API}/signin`).send({username, password});
      })
      .then(({body}) => {
        expect(body.firstName).to.exist;
        expect(body.lastName).to.exist;
        done();
      })
      .catch(() => done());
    });

    it('should get current', done => {
      agent.get(`${API}/current`).end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should signout', done => {
      agent.post(`${API}/signout`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

  after(done => {
    User.destroy({where: {}}).then(() => done());
  });
});
