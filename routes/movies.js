const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAllMovies);

router.get('/:id', moviesController.getMovieById);

router.post('/', isAuthenticated, validation.dataMovie, moviesController.createMovie);

router.put('/:id', isAuthenticated, validation.dataMovie, moviesController.updateMovie);

router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;