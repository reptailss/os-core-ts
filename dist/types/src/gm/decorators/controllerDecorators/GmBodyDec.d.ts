import { GmImport, IGmModuleClassMethodPropDecorator } from "../../core";
export declare class GmBodyDec implements IGmModuleClassMethodPropDecorator {
    private readonly schemaVarName;
    constructor(schemaVarName: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
