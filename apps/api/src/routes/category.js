const express = require('express');
const { getAll, create } = require('../controllers/category');
// const { protect, restrictTo} = require('../controllers/authController');

const categoryRouter = express.Router();

// get all foods
categoryRouter.get('/', getAll);

// create food
categoryRouter.post('/create', create);

module.exports = categoryRouter