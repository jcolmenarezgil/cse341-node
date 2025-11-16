const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CRUD API',
        description: 'Crud API for CSE341',
    },
    host: process.env.NODE_ENV === 'production' ? 'cse341-node-6l61.onrender.com' : 'localhost:3000',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);