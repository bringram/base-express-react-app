import request from 'supertest';
import server from '../server';

describe('/', () => {

  describe('GET /', () => {
    let res: request.Response;

    beforeEach(async () => {
      res = await request(server).get('/');
    });

    afterAll(() => {
      server.close();
    });

    it('Should return 200 OK', () => {
      expect(res.status).toBe(200);
    });

    it('Should return "Hello world!"', () => {
      expect(res.text).toEqual('Hello world!');
    });
  });

  describe('GET /random-url', () => {
    it('Should return 404 NOT FOUND', async (done) => {
      request(server).get("/reset").expect(404, done);
    });
  });

});