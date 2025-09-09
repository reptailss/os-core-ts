import { GmAbstractModuleType, IGmModuleType } from "../../core";
import { GmConfig } from "../..";
export declare class GmModuleUpdateDto extends GmAbstractModuleType implements IGmModuleType {
    private readonly gmModuleCreateDto;
    constructor(config: GmConfig);
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
