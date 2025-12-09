const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', booksController.getAllBooks);

router.get('/:id', booksController.getBookById);

router.post('/', isAuthenticated, validation.dataBook, booksController.createBook);

router.put('/:id', isAuthenticated, validation.dataBook, booksController.updateBook);

router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;