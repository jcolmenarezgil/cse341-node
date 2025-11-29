const router = require('express').Router();


router.get('/', (req, res) => {
    try {
        res.send('Welcome User');
    } catch (error) {
        console.error('Error in / route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
    
router.use('/', require('./swagger'));
router.use('/movies', require('./movies'));
router.use('/books', require('./books'));

// Middleware 404
router.use((req, res) => {
    try {
        const error = new Error(`Route not found: ${ req.originalUrl }`)  ;
        error.status = 404;
        next(error);
    } catch (error) {
        console.error('Internal server error:', error);
        res.status = 500;
        next(error);
    }
});

module.exports = router;