import { GmImport, IGmModuleClassMethodDecorator } from "../../core";
export declare class GmDomainDec implements IGmModuleClassMethodDecorator {
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
