import util from 'util'
import multer from 'multer'
import GoogleCloudStorage from '@google-cloud/storage'
import path from 'path'
import { JwtToken } from './../../core'
import fs from 'fs'
const fileSize = process.env.MAX_FILE_SIZE || 2
const maxSize = fileSize * 1024 * 1024
const hasCloudStorage = !!process.env.GOOGLE_CLOUD_PROJECT_ID
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../assets/upload/'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = file.originalname.split('.').pop()
    const fileName = `${uniqueSuffix}.${fileExtension}`
    cb(null, fileName)
  }
})

const multerConfig = multer({
  storage: hasCloudStorage ? multer.memoryStorage() : storage,
  limits: { fileSize: maxSize }
}).single('file')

export const processFile = util.promisify(multerConfig)

// export const storage = GoogleCloudStorage({
//   projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
//   keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
// });

export const fileTokens = async (file) => {
  const publicToken = await JwtToken({ type: 'File', data: { path: file.path }, expiresIn: `${process.env.FILE_EXPIRE}` })
  const privateToken = await JwtToken({ type: 'File', data: file, expiresIn: `${process.env.FILE_EXPIRE}` })
  const tokens = {
    publicToken,
    privateToken
  }
  return tokens
}

export const getFileSizeAndResolvedPath = (filePath) => {
  const resolvedPath = path.resolve(filePath)
  const stat = fs.statSync(resolvedPath)
  return { fileSize: stat.size, resolvedPath }
}
