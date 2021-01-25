const  { Router } = require('express');
const authToken = require('../middlewares/authtoken');
const { getAllOrders, addOrder, getOrderById, updateOrder } = require('../models/order');
const OrderRouter = Router();

//get all orders
OrderRouter.get('/orders', authToken, getAllOrders);

//get orders by id
OrderRouter.get('/order/:id', authToken, getOrderById)

//add order
OrderRouter.post('/order',authToken, addOrder)

//update order
OrderRouter.put('/order/:id', updateOrder)

//get users orders
OrderRouter.get('/orders/user/:id', authToken, getAllOrders);

module.exports = OrderRouter;