import logger from '../../utils/logger';

const errorsFormatter = (err, req, res, next) => {
    if (err.type === undefined) {
        return res.status(400).json({ error: { message: err.message } });
    }
    if (err && err.error && err.error.isJoi) {
        return res.status(400).json({ error: { type: err.type, message: err.error.toString() } });
    }
    logger.error(err);
    res.status(500).json({ error: { message: 'Something went wrong!' } });
    next();
};

export default errorsFormatter;
