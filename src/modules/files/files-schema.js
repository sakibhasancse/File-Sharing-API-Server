import mongoose from 'mongoose'

const FileSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a File Name'],
    trim: true,
    min: [2, 'File Name can not be less then 2 characters'],
    maxlength: [100, 'File Name can not be more then 100 characters']
  },
  path: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  size: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }


}, { timestamps: true })
export default FileSchema