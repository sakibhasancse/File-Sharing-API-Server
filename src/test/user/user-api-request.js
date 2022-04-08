import { expect } from 'chai'
import server from '../../core/app'
const supertest = require('supertest')
const request = supertest(server)

export const requestForRegisterNewUser =async (inputData)=>{
    try {
        const response = await request
            .post('/api/user/signup').send(inputData).set('Accept', 'application/json')

        const result = JSON.parse(response?.text)
        return result ? response : {error: true}
    }catch (e) {
        return {error: true}
    }
}

export const requestForLoginUser =async (inputData)=>{
    try {
        const response = await request
            .post('/api/user/login').send(inputData).set('Accept', 'application/json')

        const result = JSON.parse(response?.text)
        return result ? response : {error: true}
    }catch (e) {
        return {error: true}
    }
}
