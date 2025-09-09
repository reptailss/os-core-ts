import { GmAbstractModuleClassMethod, GmServiceActionsLoggerService, IGmModuleClassMethod, IGmModuleModel } from "../../../core";
import { GmConfig } from "../../..";
declare const PROPS_VAR_NAMES: {
    initiatorOpenUserId: string;
    createDto: string;
};
export declare class GmModuleServiceMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly gmModuleDto;
    private readonly gmModuleCreateDto;
    private readonly gmServiceThrowAppError;
    private readonly gmServiceSendActionSystemLog;
    private readonly gmModuleModel;
    private readonly callVarNames;
    constructor(config: GmConfig, gmModuleModel: IGmModuleModel, gmServiceSendActionSystemLog: GmServiceActionsLoggerService, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
    private createRow;
    private getNewDtoPropertyVarName;
}
export {};
