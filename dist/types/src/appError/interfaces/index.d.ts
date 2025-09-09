import { AppErrorKey } from "..";
export interface IAppError extends Error {
    statusCode: number;
    errorCode: string | null;
    errorKey?: AppErrorKey;
    isOperational: boolean;
}
