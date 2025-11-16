const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Welcome User'); })

router.use('/movies', require('./movies'));

router.use('/books', require('./books'));

module.exports = router;