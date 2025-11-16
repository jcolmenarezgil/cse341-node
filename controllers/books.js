const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
    const result = await mongodb.getDatabase().collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getBookById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to find a book');
        return;
    }
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('books').find({ _id: bookId });
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    });
};

const createBook = async (req, res) => {
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
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the book.');
    }
};

const updateBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to update a book');
        return;
    }
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
    const response = await mongodb.getDatabase().collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
};

const deleteBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to delete a book');
        return;
    }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book.');
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};