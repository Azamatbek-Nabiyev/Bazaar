const express = require('express');
const { getAllReviewsAdmin, deleteReviewAdmin } = require('../controllers/review');
const { protect, restrictTo } = require('../controllers/authController');

const reviewAdminRouter = express.Router();

reviewAdminRouter.get('/', protect, restrictTo('admin'), getAllReviewsAdmin);
reviewAdminRouter.delete('/:id', protect, restrictTo('admin'), deleteReviewAdmin);

module.exports = reviewAdminRouter;
