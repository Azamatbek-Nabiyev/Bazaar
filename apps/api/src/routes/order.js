const express = require('express');
const { createOrder, getAllOrders, getOneOrder, updateOrderStatus, cancelOrder } = require('../controllers/order');
const { protect, restrictTo} = require('../controllers/authController');

const orderRouter = express.Router();

orderRouter.post('/', protect, createOrder);
orderRouter.get('/', protect, restrictTo('admin'), getAllOrders)
orderRouter.get('/:id', protect, restrictTo('admin'), getOneOrder);
orderRouter.patch('/:id/status', protect, restrictTo('admin'), updateOrderStatus);
orderRouter.patch('/:id/cancel', protect, cancelOrder);

module.exports = orderRouter