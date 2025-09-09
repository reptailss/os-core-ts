import { GmImport, IGmModuleClassMethodPropDecorator } from "../../core";
export declare class GmParamNumDec implements IGmModuleClassMethodPropDecorator {
    private readonly key;
    constructor(key: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
export declare class GmParamDec implements IGmModuleClassMethodPropDecorator {
    private readonly key;
    constructor(key: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
