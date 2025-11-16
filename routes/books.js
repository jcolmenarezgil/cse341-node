const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksController.getAllBooks);

router.get('/:id', booksController.getBookById);

router.post('/', validation.dataBook, booksController.createBook);

router.put('/:id', validation.dataBook, booksController.updateBook);

router.delete('/:id', booksController.deleteBook);

module.exports = router;