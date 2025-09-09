import {AppErrorHelper, AppErrorKey, ErrorValue, IAppError} from '@appError'

export class AppError extends Error implements IAppError {
    public statusCode: number
    public errorCode: string | null
    public errorKey?: AppErrorKey
    public errors?: ErrorValue[]
    public isOperational: boolean


    constructor(
        message: string,
        {
            statusCode,
            errorCode,
            errors,
            errorKey,
        }: {
            statusCode?: number
            errorCode?: string | null
            errorKey?: AppErrorKey
            errors?: ErrorValue[]
        } = {},
    ) {
        super(message)

        const errorProps = AppErrorHelper.getAppErrorCodeAndStatus({
            statusCode,
            errorCode,
            errorKey,
        })
        this.statusCode = errorProps.statusCode
        this.errorCode = errorProps.errorCode
        this.isOperational = true
        if (errorKey) {
            this.errorKey = errorKey
        }
        if (errors) {
            this.errors = errors
        }
        Error.captureStackTrace(this, this.constructor)
    }
}



