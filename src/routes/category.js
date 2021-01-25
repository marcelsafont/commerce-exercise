const { config } = require('../config/config');
const { Router } = require('express');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const { createCategory } = require('../models/category');
const CategoryRouter = Router();


//add ctegory
CategoryRouter.post('/category', [authToken, authAdmin] , createCategory)

module.exports = CategoryRouter;