import { GmImport, IGmModuleClassMethodDecorator } from "../../core";
export declare class GmPaginationQueryParamsDec implements IGmModuleClassMethodDecorator {
    private readonly schemaVarName;
    constructor(schemaVarName: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
