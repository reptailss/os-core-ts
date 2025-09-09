import { GmImport, IGmModuleClassMethodDecorator } from "../../core";
export declare class GmPutDec implements IGmModuleClassMethodDecorator {
    private readonly url;
    constructor(url: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
