const  { Router } = require('express');
const {getAllProduct, createNewProduct, getProductById, updateProduct, searchProduct, deleteProduct } = require('../models/product');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const authAdminorSeller = require('../middlewares/authadminorseller');

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

/**
 * @swagger
 * /products/search:
 *   get:
 *     tags: [Products]
 *     description: Allow search on products
 *     responses:
 *       200:
 *         description: Success
 */ 

//search products
ProductRouter.get('/products/search', searchProduct)

/**
 * @swagger
 * /product/:id:
 *   put:
 *     tags: [Products]
 *     description: Update product by id
 *     responses:
 *       200:
 *         description: Success
 */ 

//update product by id only auth and admin
ProductRouter.put('/product/:id', [authToken, authAdminorSeller], updateProduct)

/**
 * @swagger
 * /product/:id:
 *   get:
 *     tags: [Products]
 *     description: Get product by id
 *     responses:
 *       200:
 *         description: Success
 */ 

//get product by id
ProductRouter.get('/product/:id', getProductById)

/**
 * @swagger
 * /product/:id:
 *   post:
 *     tags: [Products]
 *     description: Create a new product
 *     responses:
 *       200:
 *         description: Success
 */ 

//create new product only auth admin or seller
ProductRouter.post('/product', [authToken, authAdminorSeller], createNewProduct)

/**
 * @swagger
 * /product/:id:
 *   delete:
 *     tags: [Products]
 *     description: Delete a product by id
 *     responses:
 *       200:
 *         description: Success
 */ 

//delete product only auth admin or seller
ProductRouter.delete('/product/:id', [authToken, authAdminorSeller], deleteProduct)

ProductRouter.get('/products/seller/:id' );

module.exports = ProductRouter;