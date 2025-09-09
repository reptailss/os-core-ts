import { GmImport, IGmModuleClassMethodPropDecorator } from "../../core";
export declare class GmAuthDec implements IGmModuleClassMethodPropDecorator {
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
