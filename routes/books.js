// routes/books.js
const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const { isAuthenticated } = require('../middleware/authenticate');
const { dataBook } = require('../middleware/validate');
const validateId = require('../middleware/validateId');

// GET
router.get('/', booksController.getAllBooks);
router.get('/:id', validateId, booksController.getBookById);

// POST
router.post('/', isAuthenticated, dataBook, booksController.createBook);

// PUT
router.put('/:id', isAuthenticated, validateId, dataBook, booksController.updateBook);

// DELETE
router.delete('/:id', isAuthenticated, validateId, booksController.deleteBook);

module.exports = router;