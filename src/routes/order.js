const  { Router } = require('express');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const authAdminorSeller = require('../middlewares/authadminorseller');
const { getAllOrders, addOrder, getOrderById, updateOrder, getOrdersByUserId } = require('../models/order');
const OrderRouter = Router();


/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Orders]
 *     description: Get all orders (only admin)
 *     parameters:
 *       - name: token
 *         in: header
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all orders
 */ 

//get all orders
OrderRouter.get('/orders', [authToken, authAdmin], getAllOrders);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     tags: [Orders]
 *     description: Get order by id (admin or seller)
 *     parameters:
 *       - name: token
 *         in: header
 *         type: string
 *         required: true
 *       - name: orderId
 *         type: string
 *         required: true
 *         in: path
 *       
 *     responses:
 *       200:
 *         description: Return order by id
 */ 

//get orders by id
OrderRouter.get('/order/:id', [authToken, authAdminorSeller], getOrderById)

/**
 * @swagger
 * /order:
 *   post:
 *     tags: [Orders]
 *     description: Create new order
 *     parameters:
 *       - name: token
 *         type: string
 *         required: true
 *         in: header 
 *       - name: seller
 *         type: objectId
 *         required: true
 *         in: formData
 *       - name: product
 *         type: objectId
 *         required: true
 *         in: formData
 *     responses:
 *       200:
 *         description: Return order object
 */ 

//add order
OrderRouter.post('/order', authToken, addOrder)

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     tags: [Orders]
 *     description: Update order by id (only admin or seller)
 *     parameters:
 *       - name: token
 *         in: header
 *         type: string
 *         required: true
 *       - name: orderId
 *         in: path
 *         type: string
 *         required: true
 *       - name: seller
 *         type: objectId
 *         required: true
 *         in: formData
 *       - name: product
 *         type: objectId
 *         required: true
 *         in: formData
 *       - name: date
 *         type: date
 *         required: true
 *         in: formData
 *     responses:
 *       200:
 *         description: Return new order object
 */ 

//update order
OrderRouter.put('/order/:id',[authToken, authAdminorSeller], updateOrder)

/**
 * @swagger
 * /orders/user:
 *   get:
 *     tags: [Orders]
 *     description: Get all orders by user id (only logged in)
 *     parameters:
 *       - name: token
 *         type: string
 *         required: true
 *         in: header
 *     responses:
 *       200:
 *         description: Return orders that belong to user token id
 */ 


//get users orders
OrderRouter.get('/orders/user', authToken, getOrdersByUserId);

module.exports = OrderRouter;