import { AppResponse } from "../../../appResponse";
export declare const FILE_NAME = "info.log";
export declare class RequestsLoggerHelper {
    static getDirPath(): string;
    static getFilePath(): string;
    static getErrorPropsFromBody(body?: string | object): {
        error: 0 | 1;
        errorCode: string | null;
    };
    static getUserIdFromResRequest(res: AppResponse): {
        openUserId: number | null;
        isSystem: 0 | 1 | null;
    };
}
