const express = require('express');
const { createOrder, getAllOrders } = require('../controllers/order');
const { protect, restrictTo} = require('../controllers/authController');

const orderRouter = express.Router();

orderRouter.post('/', protect, createOrder);
orderRouter.get('/', protect, getAllOrders)

module.exports = orderRouter