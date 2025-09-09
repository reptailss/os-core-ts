import { GmAbstractModuleClass, IGmModuleClass } from "../../core";
import { GmConfig } from "../..";
type CallVarNames = {
    openUserId: string;
    legalEntityId: string;
};
export declare class GmModuleGetStructureProps extends GmAbstractModuleClass implements IGmModuleClass {
    private readonly varNames;
    api: {
        add: () => string;
        update: () => string;
        delete: () => string;
        get: () => string;
        list: () => string;
    };
    constructor(config: GmConfig, varNames: {
        add: CallVarNames;
        update: CallVarNames;
        delete: CallVarNames;
        get: CallVarNames;
        list: CallVarNames;
    });
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    init(): void;
}
export {};
