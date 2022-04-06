import mongoose from "mongoose";
import User from '../../modules/auth/user-model'

const userData = {
    "name" : "sakib",
    "email" : "test@gmail.com",
    "role" : "user",
    "password" : "1212121",
    "active" : true,
}

const seedUsersData = async ()=>{
    try {
        const newUser = new User(userData)
        const result = await newUser.save()
        return result
    }catch (e) {
        return {error: e?.message}
    }
}
const clearUsers = async ()=>{
    const user = User.remove({})
    return user
}
export {seedUsersData, clearUsers}