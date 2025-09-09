import { IGmRenderModule } from "../../core";
export interface IGmRenderModuleClass extends IGmRenderModule {
    renderConstructorProps(): string;
    renderDecorators(): string;
    getExportMarkIfExported(): string;
    renderImports(): string;
    renderClass(): string;
}
