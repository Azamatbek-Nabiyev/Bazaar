const { Category } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAll = catchAsync(async (req, res, next) => {
    const products = await Category.find();

    res.status(200).json({
        total: products.length,
        status: 'success',
        data: products
    })
});

const create = catchAsync(async (req,res,next) => {

    const { title, description, isActive } = req.body;

    const created = await Category.create({ title, description, isActive });

    res.status(201).json({
        status: 'success',
        data: created
    })
});

module.exports = { getAll, create }