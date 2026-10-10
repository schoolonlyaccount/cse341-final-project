// Swagger configuration for API documentation
const swaggerAutogen = require('swagger-autogen')();

// Swagger documentation setup
const doc = {
    info: {
        title: 'Animals & Pets API',
        description: 'A RESTful API for managing information about animals and pets.'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

// Output file and endpoints for Swagger documentation
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);