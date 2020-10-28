import { createLogger, format, transports } from 'winston';

export default createLogger({
    level: 'info',
    transports: [
        new transports.Console({
            level: process.env.LOG_LEVEL || 'info',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.colorize(),
                format.printf(({ level, timestamp, message }) => `${timestamp} ${level}: ${message}`)
            )
        })
    ]
});
