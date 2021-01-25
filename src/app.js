const config = require('./config/config').config;
const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUI, swaggerDocs } = require('./swaggerconfig');
require('./database');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(require('./routes/product'));
app.use(require('./routes/user'));
app.use(require('./routes/category'));
app.use(require('./routes/order'));

app.listen(config.port, () => {
    console.log(`server listening on port ${config.port}`);
})