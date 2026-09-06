const express = require('express');
const { getAll, create } = require('../controllers/product');
const { getOne } = require('../controllers/product');
const upload = require('../middlewares/upload');
// const { protect, restrictTo} = require('../controllers/authController');

const productRouter = express.Router();

// get all foods
productRouter.get('/', getAll);

// create food
productRouter.post('/create', upload.array('images', 10), create);

productRouter.get('/:id', getOne)

module.exports = productRouter