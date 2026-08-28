const express = require('express');
const {login, requestLoginCode, verifyLoginCode, signUpRequest, confirmSignUp, protect, restrictTo} = require('../controllers/authController');
const { getAll, getOne, createAddress, updateAddress, deleteAddress, updateMe, getUserOrders } = require('../controllers/user');

const userRouter = express.Router();

// admin, chef, courier login
// userRouter.post('/login', login);

// user login
userRouter.post('/login-request', requestLoginCode);
userRouter.post('/login-verify', verifyLoginCode);

// user sign up
userRouter.post('/signup-request', signUpRequest);
userRouter.post('/signup-confirm', confirmSignUp);

// get all users - only admin
userRouter.get('/', getAll);

// update me
userRouter.patch('/me', protect, updateMe);

// delete
// userRouter.delete('/:id', protect, restrictTo('admin'), deleteUser);

// create address
userRouter.post('/me/address', protect, createAddress );

// update address
userRouter.patch('/me/address/:addressId', protect, updateAddress );

// delete address
userRouter.delete('/me/address/:addressId', protect, deleteAddress );

// get user orders
userRouter.get('/me/orders', protect, getUserOrders)
module.exports = userRouter;