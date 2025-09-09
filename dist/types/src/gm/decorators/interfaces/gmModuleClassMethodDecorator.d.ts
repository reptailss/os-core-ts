import { GmImport } from "../../core";
export interface IGmModuleClassMethodDecorator {
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
