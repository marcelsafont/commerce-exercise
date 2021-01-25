const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info:{
            title:'API commerce express',
            version: '1.0.0'
        }
    },
    apis: [__dirname + '/routes/*.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUI }
