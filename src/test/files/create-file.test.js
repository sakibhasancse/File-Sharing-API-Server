const { testSetup } = require('../setup')
import app from '../../core/app'

beforeAll(async () => {

  await app.listen(3000, () => { })
  console.log('calling')

})

afterEach(async () => {
  console.log("ca3")
})

afterAll(async () => {
  console.log("ca")
})

test('should create a file', () => {
  expect(4).toBe(4);
})
