const { config } = require('../config/config');
const { Router } = require('express');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const { createCategory } = require('../models/category');
const CategoryRouter = Router();

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Category]
 *     description: Create new category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         required: true
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */ 

//add ctegory
CategoryRouter.post('/category', [authToken, authAdmin] , createCategory)

module.exports = CategoryRouter;