const validator = require('../helpers/validate');

const dataMovie = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        year: 'required|integer',
        director: 'required|string',
        writers: 'required|string',
        release_date: 'required|string',
        running_time: 'required|string',
        budget: 'required|string',
        rating: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            const validationError = new Error('Validation failed: Los datos enviados no cumplen los requisitos.');
            validationError.status = 400;
            validationError.details = err;

            return next(validationError);
        } else {
            next();
        }
    });
};

const dataBook = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        author: 'required|string',
        publication_year: 'required|integer',
        genre: 'required|string',
        isbn: 'required|string',
        publisher: 'required|string',
        pages: 'required|integer'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            const validationError = new Error('Validation failed: unsuccessful data');
            validationError.status = 400;
            validationError.details = err;
            return next(validationError);
        } else {
            next();
        }
    });
};

module.exports = {
    dataMovie,
    dataBook
};