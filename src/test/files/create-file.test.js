import { expect } from 'chai'
const { setupDB } = require('../setup')
import server from '../../core/app'
const supertest = require('supertest')
const request = supertest(server)

setupDB('test', true)

describe('POST /file', () => {
  it('should create a file', async () => {
      const response = await request
        .post('/api/files/')
        // .attach('file', '../test-helper/1648006674320.jpeg')
        // .set('Content-Type', 'multipart/form-data')

      expect(response.status).to.equal(400);
  });

    it("shouldn't create a file, without files data", async () => {
        const response = await request
            .post('/api/files')

        expect(response.status).to.equal(400);
    });

});

