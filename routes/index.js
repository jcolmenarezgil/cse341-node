const passport = require('passport');

const router = require('express').Router();


router.get('/', (req, res) => {
    try {
        // Check if a user is logged in via the session and display their name
        if (req.session.user) {
            res.send(`Welcome, ${req.session.user.displayName}! You are logged in.`);
        } else {
            res.send('Welcome! Please log in.');
        }
    } catch (error) {
        console.error('Error in / route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.use('/', require('./swagger'));
router.use('/movies', require('./movies'));
router.use('/books', require('./books'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs' // session: true is the default, so we remove the false setting
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

// Middleware 404
router.use((req, res, next) => {
    try {
        const error = new Error(`Route not found: ${req.originalUrl}`);
        error.status = 404;
        next(error);
    } catch (error) {
        console.error('Internal server error:', error);
        // Pasa el error al manejador de errores principal
        next(new Error('Internal Server Error'));
    }
});

module.exports = router;