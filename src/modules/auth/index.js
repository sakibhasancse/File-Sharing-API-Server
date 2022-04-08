import express from 'express';
import { handleValidation, isAuth} from '../../common/middlewares';
import { userRegister, userLogin, userProfile } from './user-controller';
import user from './user-model';


const router = express.Router();

router
  .route('/signup')
  .post(handleValidation(user), userRegister)

router
  .route('/login')
  // .post(handleValidation (login), userLogin)
  .post(userLogin)

router
  .route('/profile')
  .get(isAuth, userProfile)


const init = async (app) => {
  app.use("/api/user", router);
  return app;
};
module.exports = { init };
