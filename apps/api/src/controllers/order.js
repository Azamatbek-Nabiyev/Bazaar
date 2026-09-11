const mongoose = require("mongoose");
const { Order, Product, User } = require("../models");
const { sendOrderNotification } = require("../utils/telegramBot");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { getPagination } = require("../utils/paginate");

const STATUS_LABELS = {
  pending: "kutilmoqda",
  preparing: "tayyorlanmoqda",
  delivered: "yetkazildi",
  cancelled: "bekor qilindi",
};

// mahsulot stock'ini qaytarish (buyurtma bekor qilinganda)
const restoreStock = async (items, session) => {
  await Promise.all(
    items.map((item) =>
      Product.updateOne(
        { _id: item.product },
        { $inc: { stock: item.quantity } },
        session ? { session } : undefined
      )
    )
  );
};

// mijozga Telegram orqali buyurtma haqida xabar yuborish (xatolik buyurtma jarayonini to'xtatmaydi)
const notifyOrderStatus = async (userId, order) => {
  try {
    const user = await User.findById(userId).select("+telegramChatId");

    if (!user?.telegramChatId) return;

    const statusLabel = STATUS_LABELS[order.status] ?? order.status;

    await sendOrderNotification(
      user.telegramChatId,
      `Buyurtma #${order._id} holati: *${statusLabel}*`
    );
  } catch (err) {
    console.error("Telegram bildirishnomasini yuborishda xatolik:", err.message);
  }
};

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

  // 8. Stock'ni atomik tarzda kamaytirish va buyurtmani bitta tranzaksiyada yaratish
  const session = await mongoose.startSession();
  let order;

  try {
    await session.withTransaction(async () => {
      for (const item of orderItems) {
        const updated = await Product.findOneAndUpdate(
          { _id: item.product, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
          { session, new: true }
        );

        if (!updated) {
          throw new AppError(
            `"${item.title}" uchun yetarli mahsulot qolmagan`,
            400
          );
        }
      }

      const created = await Order.create(
        [
          {
            user,
            items: orderItems,
            shippingAddress,
            shippingPrice: SHIPPING_PRICE,
            totalPrice,
            paymentMethod,
          },
        ],
        { session }
      );

      order = created[0];
    });
  } catch (err) {
    return next(err);
  } finally {
    session.endSession();
  }

  notifyOrderStatus(user, order);

  res.status(201).json({
    status: "success",
    data: order,
  });
});

// get all orders
const getAllOrders = catchAsync(async (req, res, next) => {
  const { page, limit } = getPagination(req);

  const filter = req.query.status
    ? { status: req.query.status }
    : { status: { $ne: "cancelled" } };

  const total = await Order.countDocuments(filter);
  let query = Order.find(filter).populate("user", "fullname phone");
  let totalPages = 1;

  if (page && limit) {
    query = query.skip((page - 1) * limit).limit(limit);
    totalPages = Math.ceil(total / limit) || 1;
  }

  const orders = await query;

  res.status(200).json({
    status: "success",
    total,
    page: page || 1,
    totalPages,
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

// update status (admin)
const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["pending", "preparing", "delivered", "cancelled"];

  if (!status || !allowedStatuses.includes(status)) {
    return next(
      new AppError("Invalid or missing status!", 400)
    );
  }

  const order = await Order.findById(id);

  if (!order) {
    return next(new AppError("Order not found!", 404));
  }

  const wasCancelled = order.status === "cancelled";

  order.status = status;
  await order.save();

  if (status === "cancelled" && !wasCancelled) {
    await restoreStock(order.items);
  }

  notifyOrderStatus(order.user, order);

  res.status(200).json({
    status: "success",
    data: order,
  });
});

// cancel order (customer, faqat o'z "pending" buyurtmasini)
const cancelOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return next(new AppError("Order not found!", 404));
  }

  if (order.user.toString() !== req.user._id.toString()) {
    return next(new AppError("Bu sizning buyurtmangiz emas", 403));
  }

  if (order.status !== "pending") {
    return next(
      new AppError("Bu bosqichdagi buyurtmani bekor qilib bo'lmaydi", 400)
    );
  }

  order.status = "cancelled";
  await order.save();

  await restoreStock(order.items);

  notifyOrderStatus(order.user, order);

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
  cancelOrder,
};
