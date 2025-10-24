import { DbSystemLogType } from "../../core";
import { IActionsLoggerService } from "../..";
export declare class ActionsLoggerService implements IActionsLoggerService {
    logCreateAction({ value, openUserId, config, rowId, }: {
        value: Record<string, unknown>;
        openUserId: number;
        rowId: string | number;
        config: {
            tableName: string;
            dbType: DbSystemLogType;
            database: string;
        };
    }): Promise<void>;
    logUpdateAction({ newValue, oldValue, openUserId, config, rowId, }: {
        oldValue: Record<string, unknown>;
        newValue: Record<string, unknown>;
        openUserId: number;
        rowId: string | number;
        config: {
            tableName: string;
            dbType: DbSystemLogType;
            database: string;
        };
    }): Promise<void>;
    logDeleteAction({ oldValue, openUserId, config, rowId, }: {
        oldValue: Record<string, unknown>;
        openUserId: number;
        rowId: string | number;
        config: {
            tableName: string;
            dbType: DbSystemLogType;
            database: string;
        };
    }): Promise<void>;
    private sendActionSystemLog;
    private buildAfterAndBeforeData;
    private checkHasChange;
}
