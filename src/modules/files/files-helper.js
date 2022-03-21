import util from "util";
import multer from "multer";
import GoogleCloudStorage from '@google-cloud/storage'
const fileSize = process.env.MAX_FILE_SIZE || 2
const maxSize = fileSize * 1024 * 1024;
const hasCloudStorage = process.env.GOOGLE_CLOUD_PROJECT_ID ? true : false;
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../assets/upload/'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop()
    const fileName = `${uniqueSuffix}.${fileExtension}`;
    cb(null, fileName);
  }
})

let multerConfig = multer({
  storage: hasCloudStorage ? multer.memoryStorage() : storage,
  limits: { fileSize: maxSize },
}).single("file");

export const processFile = util.promisify(multerConfig);


// export const storage = GoogleCloudStorage({
//   projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
//   keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
// });