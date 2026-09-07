const { Product } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getPagination } = require('../utils/paginate');

const getAll = catchAsync(async (req, res, next) => {
    const { page, limit } = getPagination(req);

    const total = await Product.countDocuments();
    let query = Product.find().populate('category');
    let totalPages = 1;

    if (page && limit) {
        query = query.skip((page - 1) * limit).limit(limit);
        totalPages = Math.ceil(total / limit) || 1;
    }

    const products = await query;

    res.status(200).json({
        status: 'success',
        total,
        page: page || 1,
        totalPages,
        data: products
    })
});

const create = catchAsync(async (req,res,next) => {

    const { title, category, brand, price, oldPrice, colors, sizes, badge, description, stock, isActive } = req.body;

    if (!req.files || req.files.length === 0) {
        return next(new AppError('Kamida bitta mahsulot rasmi yuklang', 400));
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const created = await Product.create({
        title, category, brand,
        image: imageUrls[0],
        images: imageUrls,
        price, oldPrice, colors, sizes, badge, description, stock, isActive
    });

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

const deleteProduct = catchAsync(async (req, res, next) => {

    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
        return next(new AppError("Bunday mahsulot yo'q", 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    })

});

module.exports = { getAll, create, getOne, deleteProduct }