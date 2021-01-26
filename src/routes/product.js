const  { Router } = require('express');
const {getAllProduct, createNewProduct, getProductById, updateProduct, searchProduct, deleteProduct, ownProducts } = require('../models/product');
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
 *     parameters:
 *       - name: start
 *         in: query
 *         type: number
 *         required: false
 *       - name: end
 *         in: query
 *         type: number
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return all products
 */ 

//get all products
ProductRouter.get('/products', getAllProduct)

/**
 * @swagger
 * /products/search:
 *   get:
 *     tags: [Products]
 *     description: Allow search on products
 *     parameters:
 *       - name: name
 *         in: query
 *         type: string
 *         required: false
 *       - name: maxPrice
 *         in: query
 *         type: string
 *         required: false
 *       - name: minPrice  
 *         in: query
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Return all products with filter
 */ 

//search products
ProductRouter.get('/products/search', searchProduct)

/**
 * @swagger
 * /product/{productId}:
 *   put:
 *     tags: [Products]
 *     description: Update product by id (only admin or seller roles)
 *     parameters:
 *       - name: productId
 *         in: path
 *         type: string
 *         required: true
 *       - name: name
 *         in: formData
 *         type: string
 *         required: true
 *       - name: available
 *         type: boolean
 *         in: formData
 *         required: false
 *       - name: price
 *         type: number
 *         in: formData
 *         required: true
 *       - name: description
 *         type: string
 *         in: formData
 *         required: false
 *       - name: seller
 *         type: objectId
 *         in: formData
 *         required: true
 *       - name: categories
 *         type: objectId
 *         in: formData
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return update product object
 */ 

ProductRouter.put('/product/:id', [authToken, authAdminorSeller], updateProduct)

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     tags: [Products]
 *     description: Get product by id
 *     parameters:
 *       - name: productId
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Return one product by id
 */ 

ProductRouter.get('/product/:id', getProductById)

/**
 * @swagger
 * /product:
 *   post:
 *     tags: [Products]
 *     description: Create a new product
 *     parameters:
 *       - name: name
 *         type: string
 *         required: true
 *         in: formData 
 *       - name: price
 *         type: string
 *         required: true
 *         in: formData
 *       - name: description
 *         type: string
 *         required: false
 *         in: formData
 *       - name: categories
 *         type: objectId
 *         required: false
 *         in: formData    
 *     responses:
 *       200:
 *         description: Return new order object
 */ 

//create new product only auth admin or seller
ProductRouter.post('/product', [authToken, authAdminorSeller], createNewProduct)

/**
 * @swagger
 * /product/{productId}:
 *   delete:
 *     tags: [Products]
 *     description: Delete a product by id (only admin or seller)
 *     parameters:
 *       - name: productId
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Return updated order object
 */ 

ProductRouter.delete('/product/:id', [authToken, authAdminorSeller], deleteProduct)

/**
 * @swagger
 * /products/seller/{userId}:
 *   get:
 *     tags: [Products]
 *     description: Get products by seller id (only admin or seller)
 *     parameters:
 *       - name: userId
 *         type: objectId
 *         in: path
 *         required: true     
 *     responses:
 *       200:
 *         description: Return orders that belong to specific seller id
 */ 

ProductRouter.get('/products/seller/:id', [authToken, authAdminorSeller], ownProducts );

module.exports = ProductRouter;