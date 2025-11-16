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
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
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
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    dataMovie,
    dataBook
};