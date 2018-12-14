var Request = require('request');

describe('Admin suite', () => {
  var server;
  beforeAll(() => {
    server = require('../server.js');
  });
  afterAll(() => {
    server.close();
  });
  describe('list', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(process.env.api_url + '/API/administrador', (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
      it('Status 200', () => {
        expect(data.status).toBe(200);
      });
    });
  });
});
