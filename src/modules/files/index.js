import {
  uploadNewFile,
  getListFiles,
  downloadFile,
  deleteFile
} from './files-controller';
import express from 'express';
const filesRouter = express.Router();
filesRouter
  .route('/files/:publicKey')
  .post(uploadNewFile)
  // .get(getListFiles())
  .get(downloadFile)
  .delete(deleteFile);

const init = async (app) => {
  app.use("/api", filesRouter);
  return app;
};

export default { init };
