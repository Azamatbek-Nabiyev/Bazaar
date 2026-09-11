const { Schema, model } = require("mongoose");
const orderItemSchema = require("./orderItem");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: {
    type: [orderItemSchema],
    required: true,
  },

  shippingAddress: {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },

  shippingPrice: {
    type: Number,
    default: 0,
    min: 0,
  },

  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  status: {
    type: String,
    enum: ["pending", "preparing", "delivered", "cancelled"],
    default: "pending",
  },

  paymentMethod: {
    type: String,
    enum: ["cash", "card"],
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
}, { timestamps: true });

const Order = model("Order", orderSchema);

module.exports = Order;