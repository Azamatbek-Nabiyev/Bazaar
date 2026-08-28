const Product = require('./product/product');
const Category = require('./product/category');
const PendingSignUp = require('./user/pendingSignUp');
const User = require('./user/user');
const Order = require('./order/order');
const orderItemSchema = require('./order/orderItem');


module.exports = { Product, Category, PendingSignUp, User, Order, orderItemSchema }