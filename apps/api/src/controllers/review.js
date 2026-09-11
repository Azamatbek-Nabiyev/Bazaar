const mongoose = require("mongoose");
const { Review, Order, Product } = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { getPagination } = require("../utils/paginate");

// Product.rating va reviewCount'ni qayta hisoblash
const recalculateProductRating = async (productId) => {
  const stats = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const rating = stats[0] ? Math.round(stats[0].avgRating * 10) / 10 : 0;
  const reviewCount = stats[0] ? stats[0].count : 0;

  await Product.findByIdAndUpdate(productId, { rating, reviewCount });
};

// mahsulotga tegishli sharhlarni olish (public)
const getProductReviews = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { page, limit } = getPagination(req);

  const total = await Review.countDocuments({ product: productId });
  let query = Review.find({ product: productId })
    .populate("user", "fullname")
    .sort({ createdAt: -1 });
  let totalPages = 1;

  if (page && limit) {
    query = query.skip((page - 1) * limit).limit(limit);
    totalPages = Math.ceil(total / limit) || 1;
  }

  const reviews = await query;

  res.status(200).json({
    status: "success",
    total,
    page: page || 1,
    totalPages,
    data: reviews,
  });
});

// foydalanuvchi ushbu mahsulotga sharh qoldirishga haqlimi
const getEligibility = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const hasDeliveredOrder = await Order.exists({
    user: req.user._id,
    status: "delivered",
    "items.product": productId,
  });

  const existingReview = await Review.findOne({
    product: productId,
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    data: {
      canReview: Boolean(hasDeliveredOrder),
      alreadyReviewed: Boolean(existingReview),
      existingReview,
    },
  });
});

// sharh qoldirish
const createReview = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return next(new AppError("Reyting 1 dan 5 gacha bo'lishi kerak", 400));
  }

  const order = await Order.findOne({
    user: req.user._id,
    status: "delivered",
    "items.product": productId,
  });

  if (!order) {
    return next(
      new AppError(
        "Sharh qoldirish uchun ushbu mahsulotni xarid qilib, yetkazib olishingiz kerak",
        403
      )
    );
  }

  let review;
  try {
    review = await Review.create({
      product: productId,
      user: req.user._id,
      order: order._id,
      rating,
      comment,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new AppError("Siz allaqachon sharh qoldirgansiz", 400));
    }
    return next(err);
  }

  await recalculateProductRating(productId);

  res.status(201).json({
    status: "success",
    data: review,
  });
});

// o'z sharhini tahrirlash
const updateReview = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  if (rating !== undefined && (rating < 1 || rating > 5)) {
    return next(new AppError("Reyting 1 dan 5 gacha bo'lishi kerak", 400));
  }

  const review = await Review.findOneAndUpdate(
    { product: productId, user: req.user._id },
    { rating, comment },
    { new: true, runValidators: true }
  );

  if (!review) {
    return next(new AppError("Sharh topilmadi", 404));
  }

  await recalculateProductRating(productId);

  res.status(200).json({
    status: "success",
    data: review,
  });
});

// o'z sharhini o'chirish
const deleteReview = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const review = await Review.findOneAndDelete({
    product: productId,
    user: req.user._id,
  });

  if (!review) {
    return next(new AppError("Sharh topilmadi", 404));
  }

  await recalculateProductRating(productId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// barcha sharhlarni olish (faqat admin) - moderatsiya uchun
const getAllReviewsAdmin = catchAsync(async (req, res, next) => {
  const { page, limit } = getPagination(req);

  const filter = req.query.product ? { product: req.query.product } : {};

  const total = await Review.countDocuments(filter);
  let query = Review.find(filter)
    .populate("product", "title image")
    .populate("user", "fullname phone")
    .sort({ createdAt: -1 });
  let totalPages = 1;

  if (page && limit) {
    query = query.skip((page - 1) * limit).limit(limit);
    totalPages = Math.ceil(total / limit) || 1;
  }

  const reviews = await query;

  res.status(200).json({
    status: "success",
    total,
    page: page || 1,
    totalPages,
    data: reviews,
  });
});

// istalgan sharhni o'chirish (faqat admin) - moderatsiya uchun
const deleteReviewAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findByIdAndDelete(id);

  if (!review) {
    return next(new AppError("Sharh topilmadi", 404));
  }

  await recalculateProductRating(review.product);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getProductReviews,
  getEligibility,
  createReview,
  updateReview,
  deleteReview,
  getAllReviewsAdmin,
  deleteReviewAdmin,
};
