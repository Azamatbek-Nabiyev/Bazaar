const { Category } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getPagination } = require('../utils/paginate');

const getAll = catchAsync(async (req, res, next) => {
    const { page, limit } = getPagination(req);

    const total = await Category.countDocuments();
    let query = Category.find();
    let totalPages = 1;

    if (page && limit) {
        query = query.skip((page - 1) * limit).limit(limit);
        totalPages = Math.ceil(total / limit) || 1;
    }

    const categories = await query;

    res.status(200).json({
        status: 'success',
        total,
        page: page || 1,
        totalPages,
        data: categories
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

const deleteCategory = catchAsync(async (req, res, next) => {

    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
        return next(new AppError("Bunday kategoriya yo'q", 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    })

});

module.exports = { getAll, create, deleteCategory }