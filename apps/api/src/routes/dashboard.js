const express = require('express');
const { getSummary } = require('../controllers/dashboard');
const { protect, restrictTo } = require('../controllers/authController');

const dashboardRouter = express.Router();

dashboardRouter.get('/summary', protect, restrictTo('admin'), getSummary);

module.exports = dashboardRouter;
