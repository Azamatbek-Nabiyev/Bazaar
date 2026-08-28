const express = require('express');
const { createOrder } = require('../controllers/order');
const { protect, restrictTo} = require('../controllers/authController');

const orderRouter = express.Router();

orderRouter.post('/', protect, createOrder);

module.exports = orderRouter