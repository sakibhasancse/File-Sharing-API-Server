const { testSetup } = require('../setup')
import server from '../../server'
const request = require('supertest')(server)

before(async () => {

})

afterEach(async () => {
  console.log("ca3")
})

after(async () => {
  // testSetup()
})

describe('POST /file', () => {
  it('should create a file', async () => {
    const response = await request
      .post('/files').send({
        file: 'test file'
      })
    console.log({response})
  });


});

