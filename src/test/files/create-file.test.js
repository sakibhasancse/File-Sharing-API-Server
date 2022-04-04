const { setupDB } = require('../setup')
import server from '../../server'
const supertest = require('supertest')
const request = supertest(server)


setupDB('testdb', true)

describe('POST /file', () => {
  it('should create a file', async () => {
    const response = await request
      .get('/files')
    assert.equal(response, 'foo')
    console.log({ response })
  });


});

