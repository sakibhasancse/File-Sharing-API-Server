import server from '../../core/app'
const supertest = require('supertest')
const request = supertest(server)

export const requestForSaveFile = async (inputData)=>{
   try{
       const response =  await request
           .post('/api/files/')
       // .attach('file', '../test-helper/1648006674320.jpeg')
       // .set('Content-Type', 'multipart/form-data')

       const result = JSON.parse(response?.text)
       return result ? response : {error: true}
   }catch (e) {
       return  {error: true}
   }
}

