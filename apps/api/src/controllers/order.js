const { Order, Product } = require("../models");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// create order
const createOrder = catchAsync(async (req, res, next) => {
  const {
    shippingAddress,
    paymentMethod,
    items,
  } = req.body;

  const user = req.user._id;

  const SHIPPING_PRICE = 10000;

  // 1. Validate items
  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(
      new AppError(
        "Order kamida bitta mahsulotdan iborat bo'lishi kerak",
        400
      )
    );
  }

  // 2. Validate shipping address
  if (!shippingAddress?.city || !shippingAddress?.address) {
    return next(
      new AppError("Shipping address is required!", 400)
    );
  }

  // 3. Validate payment method
  if (!["cash", "card"].includes(paymentMethod)) {
    return next(
      new AppError("Invalid payment method!", 400)
    );
  }

  // 4. Validate products and quantities
  if (
    items.some(
      (item) =>
        !item.product ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
    )
  ) {
    return next(
      new AppError(
        "Each item must have a valid product and quantity!",
        400
      )
    );
  }

  // 5. Get products from database
  const productIds = items.map((item) => item.product);

  const products = await Product.find({
    _id: { $in: productIds },
    isActive: true,
  });

  if (products.length !== productIds.length) {
    return next(
      new AppError(
        "Some products were not found or are inactive!",
        404
      )
    );
  }

  // 6. Create order items using database data
  const orderItems = items.map((item) => {
    const product = products.find(
      (product) => product._id.toString() === item.product
    );

    return {
      product: product._id,
      title: product.title,
      price: product.price,
      quantity: item.quantity,
      image: product.image,
    };
  });

  // 7. Calculate total price
  const totalPrice =
    orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) + SHIPPING_PRICE;

  // 8. Create order
  const order = await Order.create({
    user,
    items: orderItems,
    shippingAddress,
    shippingPrice: SHIPPING_PRICE,
    totalPrice,
    paymentMethod,
  });

  res.status(201).json({
    status: "success",
    data: order,
  });
});

// get all orders
const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({
    status: { $ne: "cancelled" },
  }).populate(
    "user",
    "fullname phone"
  );

  res.status(200).json({
    status: "success",
    total: orders.length,
    data: orders,
  });
});

// get one order
const getOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate(
    "user",
    "fullname phone"
  );

  if (!order) {
    return next(new AppError("Order not found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

// update status
const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "pending",
    "confirmed",
    "preparing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!status || !allowedStatuses.includes(status)) {
    return next(
      new AppError("Invalid or missing status!", 400)
    );
  }

  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    return next(new AppError("Order not found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

module.exports = {
  createOrder,
  getOneOrder,
  getAllOrders,
  updateOrderStatus,
};