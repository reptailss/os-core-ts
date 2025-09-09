import { GmRenderModule, IGmModuleClass, IGmRenderModuleClass } from "../core";
export declare class GmRenderModuleClass extends GmRenderModule implements IGmRenderModuleClass {
    private readonly moduleClass;
    private readonly gmRenderImports;
    constructor(moduleClass: IGmModuleClass);
    renderImports(): string;
    renderConstructorProps(): string;
    renderDecorators(): string;
    getExportMarkIfExported(): string;
    renderClass(): string;
    private renderElementsBeforeClass;
    private renderVars;
    private renderStringMethods;
}
