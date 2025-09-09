import {IGmRenderModule} from '@gm/core'

export interface IGmRenderModuleClass extends IGmRenderModule {

    renderConstructorProps(): string

    renderDecorators(): string

    getExportMarkIfExported(): string

    renderImports(): string

    renderClass(): string


}

