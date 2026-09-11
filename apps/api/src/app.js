const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const dashboardRouter = require('./routes/dashboard');
const reviewRouter = require('./routes/review');
const reviewAdminRouter = require('./routes/reviewAdmin');

const app = express();
app.use(helmet({
    // /uploads dagi rasmlar boshqa origin'lardagi (admin/web) <img> teglari orqali yuklanadi
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"], // frontend url
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/products', productRouter);
app.use('/products/:productId/reviews', reviewRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/dashboard', dashboardRouter);
app.use('/reviews', reviewAdminRouter);

// agar route yo'q bo'lsa
app.all('*other', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalErrorController);

module.exports = app;
