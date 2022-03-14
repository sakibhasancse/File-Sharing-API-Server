import mongoose from 'mongoose'
import slugify from 'slug'

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a Book Name'],
        trim: true,
        min: [2, 'Book Name can not be less then 2 characters'],
        maxlength: [100, 'Book Name can not be more then 100 characters']
    },
    slug: {
        type: String
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre'],
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

bookSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

const book = mongoose.model('Book', bookSchema)

export default book