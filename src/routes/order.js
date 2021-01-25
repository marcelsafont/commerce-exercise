const  { Router } = require('express');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const { getAllOrders, addOrder, getOrderById, updateOrder, getOrdersByUserId } = require('../models/order');
const OrderRouter = Router();


/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Orders]
 *     description: Get all orders
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
 *     responses:
 *       200:
 *         description: Success
 */ 

//get orders by id
OrderRouter.get('/order/:id', [authToken, authAdmin], getOrderById)

/**
 * @swagger
 * /order:
 *   post:
 *     tags: [Orders]
 *     description: Create new order
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
OrderRouter.put('/order/:id',[authToken, authAdmin], updateOrder)

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