const express = require('express');
const { getAll, create } = require('../controllers/product');
const { getOne } = require('../controllers/product');
// const { protect, restrictTo} = require('../controllers/authController');

const productRouter = express.Router();

// get all foods
productRouter.get('/', getAll);

// create food
productRouter.post('/create', create);

productRouter.get('/:id', getOne)

module.exports = productRouter