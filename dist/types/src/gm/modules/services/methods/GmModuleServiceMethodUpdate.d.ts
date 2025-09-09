import { GmConfig } from "../../..";
import { GmAbstractModuleClassMethod, GmServiceActionsLoggerService, IGmModuleClassMethod, IGmModuleModel } from "../../../core";
declare const PROPS_VAR_NAMES: {
    initiatorOpenUserId: string;
    updateDto: string;
    id: string;
};
export declare class GmModuleServiceMethodUpdate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly gmModuleDto;
    private readonly gmModuleUpdateDto;
    private readonly gmServiceThrowAppError;
    private readonly gmServiceSendActionSystemLog;
    private readonly gmModuleModel;
    private readonly callVarNames;
    constructor(config: GmConfig, gmModuleModel: IGmModuleModel, gmServiceSendActionSystemLog: GmServiceActionsLoggerService, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
    private checkHasRow;
    private updateRow;
    private getNewDtoVarName;
    private getOldDtoVarName;
    private getOldDtoVarNameByUniqFields;
}
export {};
