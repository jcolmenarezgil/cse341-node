const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database');
const app = express();

// app port
const port = process.env.PORT || 3000;
// app routes with try/catch
try {

    app.use(bodyParser.json());
    app.use('/', require('./routes'));

} catch (error) {

    console.error('Error trying to load routes', error);
}

// mondodb init
mongodb.initDb((err) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node server is Running on port ${port}`) });
    }
})

process.on('uncaughtException', (err, origin) => {
    console.error(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;

    console.error(`Error ${statusCode}:`, err.message);

    res.status(statusCode).json({
        message: statusCode === 500
            ? 'Internal Server Error'
            : err.message || 'Failured to process request'
    });
});