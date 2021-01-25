const config = require('./config/config').config;
const express = require('express');
const bodyParser = require('body-parser');
require('./database');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

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
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(require('./routes/product'));
app.use(require('./routes/user'));
app.use(require('./routes/category'));
app.use(require('./routes/order'));

app.listen(config.port, () => {
    console.log(`server listening on port ${config.port}`);
})