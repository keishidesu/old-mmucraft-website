require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Sample test', () => {
  it('should list ALL items on /route GET', (done) => {
  chai.request(server)
    .get('/rules')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it('should list a SINGLE item on /route/<id> GET');
  it('should add a SINGLE item on /route POST');
  it('should update a SINGLE item on /route/<id> PUT');
  it('should delete a SINGLE item on /route/<id> DELETE');
});

module.exports = server;