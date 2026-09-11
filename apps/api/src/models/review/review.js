const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

// bitta foydalanuvchi bitta mahsulotga faqat bitta sharh qoldira oladi
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = model("Review", reviewSchema);

module.exports = Review;
