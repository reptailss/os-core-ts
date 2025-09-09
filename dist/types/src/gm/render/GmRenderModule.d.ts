import { IGmModule, IGmRenderModule } from "../core";
export declare class GmRenderModule implements IGmRenderModule {
    private readonly module;
    constructor(module: IGmModule);
    renderPropertyName(): string;
}
