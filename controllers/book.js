const Book = require('../models/Book');

/**
 * Add books.
 *
 * @param req
 * @param res
 */
module.exports.add = async (req, res) => {
    const { title, author, isbn } = req.body;

    const book = new Book({ title, author, isbn });
    await book.save();

    res.send({
        message: 'Saved',
        book: book.toJSON()
    });
};

/**
 * Fetch all books.
 *
 * @param req
 * @param res
 */
module.exports.fetchAll = async (req, res) => {
    const books = await Book.find();
    res.send({ books });
};

/**
 * Builds a mongoose query object to search books according to book name and author name.
 * @param name String containing the book name or part of the book's name
 * @param author String containing the author name or part of the author's name
 */
module.exports.buildBookSeachQuery = (name, author) => {
    const query = {};
    if (name) {
        query.name = new RegExp(`.*${name}.*`, 'i');
    }
    if (author) {
        query.author = new RegExp(`.*${author}.*`, 'i');
    }

    return query;
};

/**
 * Get a book.
 *
 * @param req
 * @param res
 */
module.exports.get = async (req, res) => {
    const { name = undefined, author = undefined } = req.query;

    const query = buildBookSeachQuery(name, author);
    const books = await Book.find(query);
    res.send({ books });
};
