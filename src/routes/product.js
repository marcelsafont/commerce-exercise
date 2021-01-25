const  { Router } = require('express');
const {getAllProduct, createNewProduct, getProductById, updateProduct, searchProduct } = require('../models/product');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const ProductRouter = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Success
 */ 

//get all products
ProductRouter.get('/products', getAllProduct)

//search products
ProductRouter.get('/products/search', searchProduct)

//update product by id only auth and admin
ProductRouter.put('/product/:id', [authToken, authAdmin], updateProduct)

//get product by id
ProductRouter.get('/product/:id', getProductById)

//create new product only auth and admin
ProductRouter.post('/product', [authToken, authAdmin], createNewProduct)

module.exports = ProductRouter;