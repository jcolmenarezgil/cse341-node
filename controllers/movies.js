const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().collection('movies').find();
        const movies = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

const getMovieById = async (req, res, next) => {
    try {
        const movieId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('movies').findOne({ _id: movieId });
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Movie not found.' });
        }
    } catch (error) {
        error.status = 500;
        next(error);
    }
};


const createMovie = async (req, res, next) => {
    try {
        const movie = {
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            writers: req.body.writers,
            release_date: req.body.release_date,
            running_time: req.body.running_time,
            budget: req.body.budget,
            rating: req.body.rating,
        };

        const response = await mongodb.getDatabase().collection('movies').insertOne(movie);

        if (response.acknowledged) {
            res.status(201).json(response.insertedId);
        } else {
            const error = new Error(response.error || 'Failure to confirm the creation of the film.');
            error.status = 500;
            next(error);
        }

    } catch (error) {
        console.error('Error in createMovie:', error.message);
        error.status = 500;
        next(error);
    }
};

const updateMovie = async (req, res, next) => {
    try {
        const movieId = new ObjectId(req.params.id);
        const movie = {
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            writers: req.body.writers,
            release_date: req.body.release_date,
            running_time: req.body.running_time,
            budget: req.body.budget,
            rating: req.body.rating
        };

        const response = await mongodb.getDatabase().collection('movies').replaceOne({ _id: movieId }, movie);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            if (response.error) {
                const error = new Error(response.error || 'Failed to confirm movie update.');
                error.status = 500;
                return next(error);
            }
            return res.status(404).json({ mensaje: 'The movie with the provided ID was not found to update.' });
        }

    } catch (error) {
        console.error('Error in updateMovie:', error.message);
        error.status = 500;
        next(error);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        const movieId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('movies').deleteOne({ _id: movieId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'The movie with the provided ID was not found for deletion.' });
        }
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}