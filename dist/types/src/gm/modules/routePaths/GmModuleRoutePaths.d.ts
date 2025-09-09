import { GmAbstractModuleConstant, IGmModuleConstant } from "../../core";
import { GmConfig } from "../..";
export declare class GmModuleRoutePaths extends GmAbstractModuleConstant implements IGmModuleConstant {
    constructor(config: GmConfig);
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    getRoutePathPropertyName(type: 'add' | 'update' | 'delete' | 'get' | 'list'): string;
    init(): void;
    private getModuleKey;
}
