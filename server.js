const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database');
const app = express();

const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');


const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', require('./routes'));
app.use('./api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node server is Running on port ${port}`) });
    }
});
