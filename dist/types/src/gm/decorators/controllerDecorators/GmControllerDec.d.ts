import { GmImport, IGmModuleClassDecorator } from "../../core";
export declare class GmControllerDec implements IGmModuleClassDecorator {
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
