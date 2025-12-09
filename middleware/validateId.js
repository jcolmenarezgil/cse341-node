const { ObjectId } = require('mongodb');

const validateId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        const validationError = new Error('Invalid ID format provided.');
        validationError.status = 400;
        return next(validationError);
    }
    next();
};

module.exports = validateId;
