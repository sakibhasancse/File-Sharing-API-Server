import { expect } from 'chai'
import server from '../../core/app'
import {clearUsers} from "./user-helper";
const supertest = require('supertest')
const request = supertest(server)

describe('POST /user', () => {
    it('should create a user', async () => {
        await clearUsers()

        const response = await request
            .post('/api/user/signup').send({
                email: "test@gmail.com",
                name: "sakib",
                phone: "01763553147",
                password: "1312312"
            }).set('Accept', 'application/json')

        const result = JSON.parse(response?.text)

        expect(response?.statusCode).to.equal(201);
        expect(result?.user?.email).to.equal("test@gmail.com");
        expect(result?.success).to.equal(true);
        expect(result?.user?.name).to.equal("sakib");
    });

    it("shouldn't create a user, without user data", async () => {
        const response = await request
            .post('/api/user/signup')

        expect(response.statusCode).to.equal(500);
    });

});

