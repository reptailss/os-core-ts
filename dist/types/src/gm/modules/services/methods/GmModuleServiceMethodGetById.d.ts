import { GmConfig } from "../../..";
import { GmAbstractModuleClassMethod, IGmModuleClassMethod, IGmModuleModel } from "../../../core";
declare const PROPS_VAR_NAMES: {
    id: string;
};
export declare class GmModuleServiceMethodGetById extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly gmModuleDto;
    private readonly gmModuleModel;
    private readonly callVarNames;
    constructor(config: GmConfig, gmModuleModel: IGmModuleModel, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
    private initGetRow;
}
export {};
