const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Welcome User'); })

router.use('/movies', require('./movies'));

module.exports = router;