import { expect } from 'chai'
import {clearUsers} from "./user-helper";
import {requestForRegisterNewUser} from './user-api-request';

describe('POST /user/signup', () => {
    it('should create a user', async () => {
        await clearUsers()
        const response = await requestForRegisterNewUser({
                email: "test@gmail.com",
                name: "sakib",
                phone: "01763553147",
                password: "1312312"
            })

        const result = JSON.parse(response?.text)

        expect(response?.statusCode).to.equal(201);
        expect(result).to.be.a("object");
        expect(result?.user?.email).to.equal("test@gmail.com");
        expect(result?.success).to.equal(true);
        expect(result?.user?.name).to.equal("sakib");
    });

    it("shouldn't create a user, without user data", async () => {
        const response = await requestForRegisterNewUser({})
        expect(response.error).to.equal(true);
    });

});

