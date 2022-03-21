import {
  uploadNewFile,
  getListFiles,
  downloadFile,
  deleteFile
} from './files-controller';
import express from 'express';
const filesRouter = express.Router();

filesRouter
  .route('/files')
  .post(uploadNewFile)
  .get(getListFiles);

filesRouter.route('/files/accessToken')
  .get(downloadFile)
  .delete(deleteFile);

const init = async (app) => {
  app.use("/api", filesRouter);
  return app;
};
module.exports = { init };
