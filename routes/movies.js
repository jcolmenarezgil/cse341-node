const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAllMovies);

router.get('/:id', moviesController.getMovieById);

router.post('/', validation.dataMovie, moviesController.createMovie);

router.put('/:id', validation.dataMovie, moviesController.updateMovie);

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;