import { AppError, AppErrorKey, ErrorValue } from "..";
import { ErrorResult } from "../../responseFormat";
export declare class AppErrorHelper {
    static checkIsAppErrorKey(key: string): key is AppErrorKey;
    static checkIsErrorResult(error: unknown): error is ErrorResult;
    static checkIsAppError(error: unknown): error is AppError;
    static getErrorsFromAppError(error: AppError): ErrorValue[];
    static getAppErrorCodeAndStatus({ errorCode, statusCode, errorKey, }: {
        statusCode?: number;
        errorCode?: string | null;
        errorKey?: AppErrorKey;
    }): {
        statusCode: number;
        errorCode: string;
    };
    static getErrorMessageByErrorKey(errorKey: AppErrorKey): string;
    static buildErrorResultFromError(error: unknown): ErrorResult;
    static getFieldsFromError(error: unknown): {
        isOperational: boolean;
        statusCode: number | null;
        errorCode: string | null;
        errorKey: AppErrorKey | null;
        message: string | null;
        errors?: ErrorValue[] | null;
    };
}
