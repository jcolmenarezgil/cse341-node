// routes/movies.js
const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const { isAuthenticated } = require('../middleware/authenticate');
const { dataMovie } = require('../middleware/validate');
const validateId = require('../middleware/validateId');

// GET
router.get('/', moviesController.getAllMovies);
router.get('/:id', validateId, moviesController.getMovieById);

// POST
router.post('/', isAuthenticated, dataMovie, moviesController.createMovie);

// PUT
router.put('/:id', isAuthenticated, validateId, dataMovie, moviesController.updateMovie);

// DELETE
router.delete('/:id', isAuthenticated, validateId, moviesController.deleteMovie);

module.exports = router;