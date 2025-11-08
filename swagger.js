const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacs API',
        description: 'Contacts API for CSE341',
    },
    host: 'https://cse341-node-w6zy.onrender.com',
    schemes: ['https']
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);