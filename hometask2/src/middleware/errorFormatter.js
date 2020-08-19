const errorFormatter = (err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        return res.status(400).json({ error: { type: err.type, message: err.error.toString() } });
    }
    next(err);
};

export default errorFormatter;
