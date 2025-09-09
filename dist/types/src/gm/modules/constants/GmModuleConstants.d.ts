import { GmAbstractModuleConstant, GmFileWriteMode, IGmModuleConstant } from "../../core";
import { GmConfig } from "../..";
export declare class GmModuleConstants extends GmAbstractModuleConstant implements IGmModuleConstant {
    private value;
    private mode;
    private propertyName;
    private hasDir;
    private fileName;
    constructor({ config, value, propertyName, hasDir, fileName, mode, }: {
        config: GmConfig;
        value: string;
        propertyName: string;
        hasDir?: boolean;
        fileName?: string;
        mode?: GmFileWriteMode;
    });
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    init(): void;
}
