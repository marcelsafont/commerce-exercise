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
 *     description: Get all orders
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 */ 

//get all orders
OrderRouter.get('/orders', [authToken, authAdmin], getAllOrders);

/**
 * @swagger
 * /order/:id:
 *   get:
 *     tags: [Orders]
 *     description: Get order by id
 *     parameters:
 *       - name: orderId
 *         type: string
 *         required: true
 *         in: path
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
 *       - name: name
 *         type: string
 *         required: true
 *         in: formData 
 *       - name: price
 *         type: string
 *         required: true
 *         in: formData    
 *     responses:
 *       200:
 *         description: Success
 */ 

//add order
OrderRouter.post('/order', authToken, addOrder)

/**
 * @swagger
 * /order:
 *   put:
 *     tags: [Orders]
 *     description: Update order by id
 *     responses:
 *       200:
 *         description: Success
 */ 

//update order
OrderRouter.put('/order/:id',[authToken, authAdminorSeller], updateOrder)

/**
 * @swagger
 * /orders/user:
 *   get:
 *     tags: [Orders]
 *     description: Get all orders by user id
 *     responses:
 *       200:
 *         description: Success
 */ 


//get users orders
OrderRouter.get('/orders/user', authToken, getOrdersByUserId);

module.exports = OrderRouter;