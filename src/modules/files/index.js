import {
  uploadNewFile,
  getListFiles,
  downloadFile,
  deleteFile,
  streamFile
} from './files-controller'
import express from 'express'
import { isAuth } from '../../common/middlewares'
const filesRouter = express.Router()

filesRouter
  .route('/files')
  .post(isAuth, uploadNewFile)
  .get(isAuth, getListFiles)

filesRouter.route('/files/:publicToken')
  .get(downloadFile)
  .delete(deleteFile)

filesRouter.route('/stream/files/:accessToken')
  .get(streamFile)

const init = async (app) => {
  app.use('/api', filesRouter)
  return app
}
module.exports = { init }
