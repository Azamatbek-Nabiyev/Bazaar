const express = require('express');
const { getProductReviews, getEligibility, createReview, updateReview, deleteReview } = require('../controllers/review');
const { protect } = require('../controllers/authController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.get('/', getProductReviews);
reviewRouter.get('/eligibility', protect, getEligibility);
reviewRouter.post('/', protect, createReview);
reviewRouter.patch('/me', protect, updateReview);
reviewRouter.delete('/me', protect, deleteReview);

module.exports = reviewRouter;
