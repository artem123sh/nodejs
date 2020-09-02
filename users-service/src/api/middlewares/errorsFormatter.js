const errorsFormatter = (err, req, res, next) => {
    if (err.type === undefined) {
        console.error(err);
        return res.status(400).json({ error: { message: err.message } });
    }
    if (err && err.error && err.error.isJoi) {
        return res.status(400).json({ error: { type: err.type, message: err.error.toString() } });
    }
    next(err);
};

export default errorsFormatter;
