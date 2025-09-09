import {IGmRenderModule} from '@gm/core'

export interface IGmRenderModuleConstant extends IGmRenderModule {

    renderBody(): string

    renderType(): string

    getData<T>(key: string): T

    getExportMarkIfExported():string

    renderImports(): string
}

