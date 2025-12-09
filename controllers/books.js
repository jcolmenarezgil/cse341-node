const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().collection('books').find();
        const books = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('books').findOne({ _id: bookId });
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Book not found.' });
        }
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

const createBook = async (req, res, next) => {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            publication_year: req.body.publication_year,
            genre: req.body.genre,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            pages: req.body.pages
        };

        const response = await mongodb.getDatabase().collection('books').insertOne(book);

        if (response.acknowledged) {
            res.status(201).json(response.insertedId);
        } else {
            const error = new Error(response.error || 'Failure to confirm book creation.');
            error.status = 500;
            next(error);
        }

    } catch (error) {
        console.error('Error creating a book:', error.message);
        error.status = 500;
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const book = {
            title: req.body.title,
            author: req.body.author,
            publication_year: req.body.publication_year,
            genre: req.body.genre,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            pages: req.body.pages
        };

        // BD updating
        const response = await mongodb.getDatabase().collection('books').replaceOne({ _id: bookId }, book);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            if (response.error) {
                const error = new Error(response.error || 'Failed to confirm book update.');
                error.status = 500;
                return next(error);
            }
            return res.status(404).json({ mensaje: 'The book with the provided ID was not found for update.' });
        }

    } catch (error) {
        console.error('updateBook error:', error.message);
        error.status = 500;
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('books').deleteOne({ _id: bookId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'The book with the provided ID was not found for deletion.' });
        }
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};