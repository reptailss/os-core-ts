import { IGmModule } from "../core";
export declare class GmRenderImports {
    private readonly module;
    constructor(module: IGmModule);
    renderImports(): string;
    private renderImportGroup;
    private getNormalizeImportPath;
}
