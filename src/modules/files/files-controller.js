import { allBooks, createBook, deleteBook, getBook, singleBooks, updateBook } from './../service/book';

export const uploadNewFile = async (req, res, next) => {
    try {
        const book = req.body
        let image;
        image ? image = req.files.image.data : null
        const newbook = await createBook(book, image)
        if (newbook instanceof Error) {
            return next(newbook, req, res)
        }
        newbook.image =undefined
        return res.status(201).json({
            success: true,
            message: 'Book created successfully',
            newbook
        })
    } catch (error) {
        console.log(error)

        return next(error, req, res)
    }
}

export const getFiles = async (req, res) => {
    const book = await getBook()
    if (book instanceof Error) {
        return next(book, req, res)
    }
    return res.status(200).json({
        success: true,
        length: book.length,
        book
    })
}




export const deleteFile = async (req, res, next) => {
    try {
        const id = req.params.id
        const book = await deleteBook(id)

        if (book instanceof Error) {
            return next(book, req, res)
        } else {

            return res.status(200).json({
                success: true,
                message: 'File deleted successfully'
            })
        }
    } catch (error) {
        return next(error, req, res)

    }

}
