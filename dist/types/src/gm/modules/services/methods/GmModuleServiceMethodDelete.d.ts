import { GmConfig } from "../../..";
import { GmAbstractModuleClassMethod, GmServiceActionsLoggerService, IGmModuleClassMethod, IGmModuleModel } from "../../../core";
declare const PROPS_VAR_NAMES: {
    initiatorOpenUserId: string;
    id: string;
};
export declare class GmModuleServiceMethodDelete extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly gmModuleDto;
    private readonly gmServiceThrowAppError;
    private readonly gmServiceSendActionSystemLog;
    private readonly gmModuleModel;
    private readonly callVarNames;
    constructor(config: GmConfig, gmModuleModel: IGmModuleModel, gmServiceSendActionSystemLog: GmServiceActionsLoggerService, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
    private checkHasOldDto;
    private deleteRow;
    private getOldDtoVarName;
}
export {};
