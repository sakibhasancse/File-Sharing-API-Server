import express from 'express';
import { handleValidation } from '../middlewares/appMid';
import { uploadNewFile, getFiles, deleteFile } from '../controllers/files-controller';

import { isAuth } from '../middlewares/auth';


const filesRouter = express.Router();
router
  .route('/files/:publicKey')
  .post(uploadNewFile())
  .get(getFiles())
  .delete(deleteFile())



export default filesRouter
