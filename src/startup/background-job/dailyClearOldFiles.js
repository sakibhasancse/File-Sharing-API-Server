import File from '../../modules/files/files-model';

const fs = require('fs');
const { default: connectWithDb } = require('../../core/mongo');

// remove olds file
const dailyClearOldFiles = async () => {
  try {
    connectWithDb();
    const maxTime = process.env.REMOVE_MAX_AGED_FILE_TIME ? parseInt(process.env.REMOVE_MAX_AGED_FILE_TIME) : 24 * 60 * 60 * 1000
  
    const files = await File.find({ createdAt: { $lt: new Date(Date.now() - maxTime) } })

    if (files.length) {
      for (const file of files) {
        try {
          fs.unlinkSync(`${__dirname}/../../../assets/upload/${file.path}`);
          await file.remove();
          console.log(`successfully deleted ${file.name}`);
        } catch (err) {
          console.log(`error while deleting file ${err} `);
        }
      }
    }
    console.log('Job done!');
  } catch (error) {
    console.log('Job faild!');
    return false
  }
}
export default dailyClearOldFiles