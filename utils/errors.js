exports.error = function (res, status, error) {
    return res.status(status).json({ error : error });
};
