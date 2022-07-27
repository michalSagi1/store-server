const bookController = require('../DL/controllers/bookController');

async function addBook(newbook) {
    if (!newbook) throw ({ code: 400, message: "Error" })
    await bookController.update({ isActive: true }, { isActive: false })

    const book = await bookController.create(newbook)
    return book
}



const getbook = async () => {
    const book = await bookController.readOne({ isActive: true })
    if (!book || book.length === 0) throw ({ code: 400, message: "no book" })
    return book

};

module.exports = { addBook, getbook }