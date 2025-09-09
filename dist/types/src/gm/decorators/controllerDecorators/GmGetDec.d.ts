import { GmImport, IGmModuleClassMethodDecorator } from "../../core";
export declare class GmGetDec implements IGmModuleClassMethodDecorator {
    private readonly url;
    constructor(url: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
