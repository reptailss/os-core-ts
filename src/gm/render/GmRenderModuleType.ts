import {GmRenderImports, GmRenderModule, IGmModuleType, IGmRenderModuleType} from '@gm/core'

export class GmRenderModuleType extends GmRenderModule implements IGmRenderModuleType {

    private readonly moduleType: IGmModuleType
    private readonly gmRenderImports: GmRenderImports

    constructor(moduleType: IGmModuleType) {
        super(moduleType)
        this.moduleType = moduleType
        this.gmRenderImports = new GmRenderImports(moduleType)

    }

    public renderBody(): string {
        return this.moduleType.getBody()
    }

    public renderImports(): string {
        return this.gmRenderImports.renderImports()
    }

    public getData<T>(key: string): T {
        return this.moduleType.getRenderData(key)
    }

    public getExportMarkIfExported(): string {
        if (this.moduleType.getExport()) {
            return 'export'
        }
        return ''
    }
}