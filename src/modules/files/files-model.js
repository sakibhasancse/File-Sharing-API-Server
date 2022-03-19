import mongoose from 'mongoose'
import slugify from 'slug'

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
    image: {
        type: Buffer,
        default: 'bookImage.jpg'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }


}, { timestamps: true })

FileSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

const files = mongoose.model('Files', FileSchema)

export default files