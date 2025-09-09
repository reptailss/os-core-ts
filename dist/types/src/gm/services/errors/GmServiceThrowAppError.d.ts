import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
import { AppErrorKey } from "../../../appError";
export declare class GmServiceThrowAppError extends GmAbstractServiceFn implements IGmService {
    getServiceName(): string;
    getExport(): GmExport;
    throwAppError({ message, errorKey, ifConstruction, }: {
        message: string;
        errorKey: AppErrorKey;
        ifConstruction?: string;
    }): string;
}
