const {seedFilesData, clearFiles} = require("./file-helper");
const {expect} = require("chai");

describe('GET/files',  ()=>{

    it('should get a file',  async ()=> {
        await clearFiles()
        const result = await seedFilesData()
        expect(result.path).to.equal('1649263107161-226524803.jpeg')
    });
})