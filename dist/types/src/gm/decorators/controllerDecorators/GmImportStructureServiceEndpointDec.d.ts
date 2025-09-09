import { GmImport, IGmModuleClassMethodDecorator } from "../../core";
export declare class GmImportStructureServiceEndpointDec implements IGmModuleClassMethodDecorator {
    private readonly name;
    constructor(name: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
