// page/limit berilmasa (masalan apps/web'ning eski so'rovlari), pagination qo'llanilmaydi
// va oldingi xatti-harakat (hammasini qaytarish) saqlanadi.
function getPagination(req) {
    const page = req.query.page ? Math.max(parseInt(req.query.page, 10) || 1, 1) : null;
    const limit = req.query.limit ? Math.max(parseInt(req.query.limit, 10) || 10, 1) : null;
    return { page, limit };
}

module.exports = { getPagination };
