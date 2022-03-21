import mongoose from 'mongoose'
import FileSchema from './files-schema';

const File = mongoose.model('Files', FileSchema)

export default File