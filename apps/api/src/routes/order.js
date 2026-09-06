const express = require('express');
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/order');
const { protect, restrictTo} = require('../controllers/authController');

const orderRouter = express.Router();

orderRouter.post('/', protect, createOrder);
orderRouter.get('/', protect, getAllOrders)
orderRouter.patch('/:id/status', protect, restrictTo('admin'), updateOrderStatus);

module.exports = orderRouter