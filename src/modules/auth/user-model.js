import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name  cannot be empty'],
    trim: true,
    min: [2, 'Name can not be less then 2 characters'],
    maxlength: [50, 'Name can not be more then 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    trim: true,
    min: [3, 'Email should be a valid '],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email should be a valid mail']
  },
  role: {
    type: String,
    default: 'user',
    enum: ['student', 'librarian']
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true })

const user = mongoose.model('User', userSchema)
export default user