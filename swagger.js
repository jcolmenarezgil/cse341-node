import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
    info: {
        title: 'Contacs API',
        description: 'Contacts API for CSE341',
    },
    host: 'https://cse341-node-w6zy.onrender.com',
    schemes: ['https']
}

swaggerAutogen(outputFile, endpointsFiles, doc);