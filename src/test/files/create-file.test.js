import { expect } from 'chai'
import {requestForSaveFile} from "./file-api-request";
const { setupDB } = require('../setup')

setupDB('test', true)

describe('POST /file', () => {
  it('should create a file', async () => {
      const response = await requestForSaveFile()

      expect(response.status).to.equal(400);
  });

    it("shouldn't create a file, without files data", async () => {
       const response = await requestForSaveFile()

        expect(response.status).to.equal(400);
    });

});

