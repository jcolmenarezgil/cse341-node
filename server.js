const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database');
const app = express();
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node server is Running on port ${port}`) });
    }
});
