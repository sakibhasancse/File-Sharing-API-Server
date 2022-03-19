import express from 'express';
import { handleValidation } from '../middlewares/appMid';
import { userRagister, userLogin, userProfile } from './../controllers/user';
import user from '../model/validation/user';
import login from '../model/validation/login';
import { isAuth } from '../middlewares/auth';


const router = express.Router();

router
    .route('/signup')
    .post(handleValidation(user), userRagister)

router
    .route('/signin')
    .post(handleValidation(login), userLogin)

router
    .route('/profile')
    .get(isAuth, userProfile)


export default router
