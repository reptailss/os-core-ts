import winston, {format, Logger} from 'winston'
import winstonDaily from 'winston-daily-rotate-file'
import {ConsoleLoggerHelper} from '@logger/core'


export class ConsoleLoggerInitializer {

    public getInstance():Logger {
        const {
            combine,
            timestamp,
            printf,
            errors,
        } = format

        const logFormat = printf(({timestamp, level, message, stack}) => {
            return stack
                ? `${level}: ${timestamp} ${message}\nStack: ${stack}`
                : `${level}: ${timestamp} ${message}`
        })

        return winston.createLogger({
            transports: [
                new winstonDaily({
                    datePattern: ConsoleLoggerHelper.getDatePattern(),
                    dirname: ConsoleLoggerHelper.getDirPath(),
                    filename: ConsoleLoggerHelper.getFileName(),
                    maxFiles: 14,
                    json: false,
                    format: combine(
                        errors({stack: true}),
                        timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        logFormat,
                    ),
                    handleExceptions: true,
                }),
                new winston.transports.Console({
                    format: winston.format.combine(
                        errors({stack: true}),
                        timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.colorize(),
                        logFormat,
                    ),
                    handleExceptions: true,

                }),
            ],
        })
    }
}