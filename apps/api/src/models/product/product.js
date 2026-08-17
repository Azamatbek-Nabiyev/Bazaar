const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Mahsulot nomi kiritilishi shart"],
      trim: true,
      minlength: 2,
      maxlength: 150,
    },
     category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: String,
      required: [true, "Brend nomi kiritilishi shart"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Mahsulot rasmi kiritilishi shart"],
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Narx kiritilishi shart"],
      min: [0, "Narx manfiy bo'lishi mumkin emas"],
    },
    oldPrice: {
      type: Number,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    badge: {
      type: String,
      enum: ["new", "sale", "hot", "bestseller", null],
      default: null,
    },
    description: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);  
const Product = model("Product", productSchema);

module.exports = Product;