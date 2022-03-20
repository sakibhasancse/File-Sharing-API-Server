import express from 'express';
import { handleValidation } from '../../middlewares/appMid';
import { userRagister, userLogin, userProfile } from './user-controller';
import user from './user-model';
import { isAuth } from '../../middlewares/auth';


const router = express.Router();

router
  .route('/signup')
  .post(handleValidation(user), userRagister)

router
  .route('/signin')
  // .post(handleValidation (login), userLogin)
  .post(userLogin)

router
  .route('/profile')
  .get(isAuth, userProfile)


const init = async (app) => {
  app.use("/api/user", router);
  return app;
};
export default { init };
