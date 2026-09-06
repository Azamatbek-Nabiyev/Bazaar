const { Order, Product, User } = require('../models');
const catchAsync = require('../utils/catchAsync');

const LOW_STOCK_THRESHOLD = 20;
const REVENUE_DAYS = 7;

const buildRevenueOverTime = (rows) => {
    const byDate = new Map(rows.map((r) => [r._id, r.revenue]));
    const result = [];

    for (let i = REVENUE_DAYS - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        result.push({ date: key, revenue: byDate.get(key) || 0 });
    }

    return result;
};

const getSummary = catchAsync(async (req, res, next) => {
    const notCancelled = { status: { $ne: 'cancelled' } };
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - (REVENUE_DAYS - 1));
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [
        revenueAgg,
        totalOrders,
        totalProducts,
        totalUsers,
        recentOrders,
        lowStockProducts,
        revenueRows,
        topProducts,
    ] = await Promise.all([
        Order.aggregate([
            { $match: notCancelled },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } },
        ]),
        Order.countDocuments(notCancelled),
        Product.countDocuments(),
        User.countDocuments({ role: 'user' }),
        Order.find().sort({ createdAt: -1 }).limit(10).populate('user', 'fullname phone'),
        Product.find({ stock: { $lt: LOW_STOCK_THRESHOLD } }).sort({ stock: 1 }).limit(10),
        Order.aggregate([
            { $match: { ...notCancelled, createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    revenue: { $sum: '$totalPrice' },
                },
            },
        ]),
        Order.aggregate([
            { $match: notCancelled },
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.product',
                    title: { $first: '$items.title' },
                    sold: { $sum: '$items.quantity' },
                    revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                },
            },
            { $sort: { sold: -1 } },
            { $limit: 5 },
        ]),
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            totalRevenue: revenueAgg[0]?.total || 0,
            totalOrders,
            totalProducts,
            totalUsers,
            recentOrders,
            lowStockProducts,
            revenueOverTime: buildRevenueOverTime(revenueRows),
            topProducts,
        },
    });
});

module.exports = { getSummary };
