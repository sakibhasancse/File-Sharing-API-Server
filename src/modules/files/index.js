import {
  uploadNewFile,
  getListFiles,
  downloadFile,
  deleteFile
} from './files-controller';
  
const filesRouter = express.Router();
router
  .route('/files/:publicKey')
  .post(uploadNewFile())
  // .get(getListFiles())
  .get(downloadFile())
  .delete(deleteFile());

const init = async (app) => {
  app.use("/api", filesRouter);
  return app;
};

module.exports = { init };
