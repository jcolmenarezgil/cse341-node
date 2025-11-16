const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res) => {
    mongodb
        .getDatabase()
        .collection('movies')
        .find()
        .toArray((err, list) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movies);
        });
};

const getMovieById = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to find a movie');
    }
    const movieId = new ObjectId(req.params.id);
    mongodb
        .getDatabase()
        .collection('movies')
        .find({ _id: movieId })
        .toArray((err, list) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movies);
        });
};


const createMovie = async (req, res) => {
    const movie = {
        title: req.body.title,
        original_title: req.body.original_title,
        year: req.body.year,
        director: req.body.director,
        writers: req.body.writers,
        producers: req.body.producers,
        cinematographer: req.body.cinematographer,
        editor: req.body.editor,
        music_composer: req.body.music_composer,
        release_date: req.body.release_date,
        running_time: req.body.running_time,
        budget: req.body.budget,
        rating: req.body.rating,
        synopsis: req.body.synopsis,
        wiki_link: req.body.wiki_link
    };
    const response = await mongodb.getDatabase().collection('movies').insertOne(movie);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the movie.');
    }
};

const updateMovie = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to update a movie');
    }
    const movieId = new ObjectId(req.params.id);
    const movie = {
        title: req.body.title,
        original_title: req.body.original_title,
        year: req.body.year,
        director: req.body.director,
        writers: req.body.writers,
        producers: req.body.producers,
        cinematographer: req.body.cinematographer,
        editor: req.body.editor,
        music_composer: req.body.music_composer,
        release_date: req.body.release_date,
        running_time: req.body.running_time,
        budget: req.body.budget,
        rating: req.body.rating,
        synopsis: req.body.synopsis,
        wiki_link: req.body.wiki_link
    };
    const response = await mongodb.getDatabase().collection('movies').replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the movie.');
    }
};

const deleteMovie = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to delete a movie');
    }
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}