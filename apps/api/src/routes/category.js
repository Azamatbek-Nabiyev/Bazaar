const express = require('express');
const { getAll, create, deleteCategory } = require('../controllers/category');
const { protect, restrictTo } = require('../controllers/authController');

const categoryRouter = express.Router();

// get all foods
categoryRouter.get('/', getAll);

// create food
categoryRouter.post('/create', protect, restrictTo('admin'), create);

categoryRouter.delete('/:id', protect, restrictTo('admin'), deleteCategory);

module.exports = categoryRouter