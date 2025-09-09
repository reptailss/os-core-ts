import { GmImport, IGmModuleClassMethodDecorator } from "../../core";
export declare class GmSwaggerInfoDec implements IGmModuleClassMethodDecorator {
    private readonly summary;
    constructor(summary: string);
    getDecoratorName(): string;
    getProps(): string[];
    getImport(): GmImport;
}
