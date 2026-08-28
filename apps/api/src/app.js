const express = require('express');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"], // frontend url
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());
    
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);

// agar route yo'q bo'lsa
app.all('*other', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalErrorController);

module.exports = app;
