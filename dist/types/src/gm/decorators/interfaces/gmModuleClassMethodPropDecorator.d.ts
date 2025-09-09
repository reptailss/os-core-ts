import { GmImport } from "../../core";
export interface IGmModuleClassMethodPropDecorator {
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
