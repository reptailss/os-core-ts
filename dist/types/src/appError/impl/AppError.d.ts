import { AppErrorKey, ErrorValue, IAppError } from "..";
export declare class AppError extends Error implements IAppError {
    statusCode: number;
    errorCode: string | null;
    errorKey?: AppErrorKey;
    errors?: ErrorValue[];
    isOperational: boolean;
    constructor(message: string, { statusCode, errorCode, errors, errorKey, }?: {
        statusCode?: number;
        errorCode?: string | null;
        errorKey?: AppErrorKey;
        errors?: ErrorValue[];
    });
}
