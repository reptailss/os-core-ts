import { GmImport, IGmModuleClassMethodPropDecorator } from "../../core";
export declare class GmQueryParamNumDec implements IGmModuleClassMethodPropDecorator {
    private readonly key;
    constructor(key: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
export declare class GmQueryParamDec implements IGmModuleClassMethodPropDecorator {
    private readonly key;
    constructor(key: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
export declare class GmQueryParamDateDec implements IGmModuleClassMethodPropDecorator {
    private readonly key;
    constructor(key: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
