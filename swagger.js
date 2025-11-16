const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CRUD API',
        description: 'Crud API for CSE341',
    },
    host: 'https://cse341-node-6l61.onrender.com',
    schemes: ['https', 'host']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);