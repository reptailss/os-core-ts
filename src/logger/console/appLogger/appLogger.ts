import {ConsoleLoggerInitializer, IAppLogger} from '@logger/core'
import {Logger} from 'winston'

let _logger: Logger

export function _initAppLogger() {
    _logger = new ConsoleLoggerInitializer().getInstance()
}

class AppLogger implements IAppLogger {
    public error(...args: any[]): void {
        if (!_logger) {
            console.error(...args)
            return
        }
        if (!args?.length) {
            return
        }
        args.forEach((arg: any) => {
            if (arg instanceof Error) {
                _logger.error({
                    message: arg.message,
                    stack: arg.stack,

                })
            } else {
                _logger.error(arg)
            }
        })
    }

    public info(...args: any[]): void {
        if (!_logger) {
            console.log(...args)
            return
        }
        _logger.info(args)
    }
}


export const appLogger: IAppLogger = new AppLogger()