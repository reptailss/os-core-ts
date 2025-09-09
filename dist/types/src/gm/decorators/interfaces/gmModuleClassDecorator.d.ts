import { GmImport } from "../../core";
export interface IGmModuleClassDecorator {
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
