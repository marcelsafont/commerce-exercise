const config = require('./config/config').config;
const express = require('express');
const bodyParser = require('body-parser');
require('./database');

//const config = './env';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('./controllers/product.routes'));
app.use(require('./controllers/user.routes'));
app.use(require('./controllers/category.routes'));
app.use(require('./controllers/order.routes'));

app.listen(config.port, () => {
    console.log(`server listening on port ${config.port}`);
})