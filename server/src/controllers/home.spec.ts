import request from 'supertest';
import server from '../server';

describe('/', () => {

  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    let res: request.Response;

    beforeEach(async () => {
      res = await request(server).get('/');
    });

    it('Should return 200 OK status', () => {
      expect(res.status).toBe(200);
    });

    it('Should return "Hello world!"', () => {
      expect(res.text).toEqual('Hello world!');
    });
  });

  describe('GET /random-url', () => {
    let res: request.Response;

    beforeEach(async () => {
      res = await request(server).get('/reset');
    });

    it('Should return 404 NOT FOUND status', () => {
      expect(res.status).toBe(404);
    });

    it('Should return "The requested resource was not found" message', () => {
      expect(res.body.message).toEqual('The requested resource was not found');
    });
  });

});
