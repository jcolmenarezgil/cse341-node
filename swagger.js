const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacs API',
        description: 'Contacts API for CSE341',
    },
    host: 'localhost:3000',
    schemes: ['https', 'host']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);