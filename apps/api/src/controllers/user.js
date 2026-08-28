const { User, Order } = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user:req.user.id })

  res.status(200).json({
    total: orders.length,
    status: 'success',
    data: orders
  })
});


const getOne = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findById(id)

    if(!user){
        return next(new AppError("Bunday foydalanuvchi yo'q", 404))
    }

    res.status(200).json({
        status:'success',
        data: user
    });
});

const updateMe = catchAsync(async (req, res, next) => {
  const { fullname, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      fullname,
      phone,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new AppError("User topilmadi", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

const getAll = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        total: users.length,
        status:'success',
        data: users
    })
});


const createAddress = catchAsync(async (req, res, next) => {
  const { city, address } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: {
        addresses: {
          city,
          address,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new AppError("User topilmadi", 404));
  }

  res.status(201).json({
    status: "success",
    data: user,
  });
});


const updateAddress = catchAsync(async (req, res, next) => {
  const { addressId } = req.params;
  const { city, address } = req.body;

  const user = await User.findOneAndUpdate(
    {
      _id: req.user.id,
      "addresses._id": addressId,
    },
    {
      $set: {
        "addresses.$.city": city,
        "addresses.$.address": address,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new AppError("Address topilmadi", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

const deleteAddress = catchAsync(async (req, res, next) => {
  const { addressId } = req.params;

  const user = await User.findOneAndUpdate(
    {
      _id: req.user.id,
      "addresses._id": addressId,
    },
    {
      $pull: {
        addresses: {
          _id: addressId,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new AppError("Address topilmadi", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});


module.exports = { getOne, getAll, createAddress, updateAddress, deleteAddress, updateMe, getUserOrders }