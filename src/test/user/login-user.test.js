import { expect } from 'chai'
import {clearUsers} from "./user-helper";
import {requestForLoginUser} from './user-api-request';

describe('POST /user/login', () => {
    it('should login user', async () => {
        const response = await requestForLoginUser({
            email: "test@gmail.com",
            password: "1312312"
        })

        const result = JSON.parse(response?.text)

        expect(response.statusCode).to.equal(200);
        expect(result).to.be.an("object");
        expect(result.success).to.equal(true);
        expect(result.message).to.equal( 'Login successful');
        expect(result.user.user).to.equal("test@gmail.com");
        expect(result.user.name).to.equal("sakib");
        expect(result.tokens.accessToken).to.be.an("string");
        expect(result.tokens.refreshToken).to.be.an("string");
    });

    it("shouldn't login  user, without email and password", async () => {
        const response = await requestForLoginUser({})
        const result = JSON.parse(response?.text)

        expect(result.success).to.equal(false);
        expect(result.message).to.equal("Invalid Email And Password");
    });

    it("shouldn't log in the user with the wrong email and password", async () => {
        const response = await requestForLoginUser({
            email: "te23st@gmail.com",
            password: "1312322312"})
        const result = JSON.parse(response?.text)

        expect(result.success).to.equal(false);
        expect(result.message).to.equal("Invalid Email And Password");
    });
});

