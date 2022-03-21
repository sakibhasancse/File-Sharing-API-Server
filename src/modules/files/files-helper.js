import util from "util";
import Multer from "multer";
import GoogleCloudStorage from '@google-cloud/storage'


const fileSize = process.env.MAX_FILE_SIZE || 2
const maxSize = fileSize * 1024 * 1024;

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");


export const processFileMiddleware = util.promisify(processFile);
export const storage = GoogleCloudStorage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});