'use strict'

const winston = require('winston');
// const DailyRotateFile = require('winston-daily-rotate-file');


const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
}

// 返回值用来定制化日志格式
const formatInfo = winston.format.printf(info => {
    return JSON.stringify(info);
})

exports.getLogger = (path) => {
    const logger = winston.createLogger({
        levels: levels,
        format: winston.format.combine(
            winston.format.timestamp(),
            formatInfo
        ),
        transports: [
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
            }),
            new winston.transports.File({
                level: 'debug',
                handleExceptions: true,
                // maxsize: 10 * 1024 * 1024,
                filename: `${path}.log`
            }),
            new winston.transports.File({
                level: 'error',
                filename: `${path}.error.log`
            })
        ],
        exceptionHandlers: [
            new winston.transports.File({
                filename: `${path}.exception.log`
            })
        ],
        exitOnError: false,
    })

    return logger;
}