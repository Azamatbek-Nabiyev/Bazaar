const { Product } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAll = catchAsync(async (req, res, next) => {
    const products = await Product.find().populate('category');

    res.status(200).json({
        total: products.length,
        status: 'success',
        data: products
    })
});

const create = catchAsync(async (req,res,next) => {

    const { title, category, brand, images, image, price, oldPrice, colors, sizes, badge, description, stock, isActive } = req.body;

    const created = await Product.create({title, category, brand, images, image, price, oldPrice, colors, sizes, badge, description, stock, isActive});

    res.status(201).json({
        status: 'success',
        data: created
    })
});

const getOne = catchAsync(async (req, res, next) => {

    const one = await Product.findById(req.params.id)

    if(!one){
       return next(new AppError("Bunday mahsulot yo'q"))
    }

    res.status(200).json({
        status:'success',
        data: one
    })

});

module.exports = { getAll, create, getOne }