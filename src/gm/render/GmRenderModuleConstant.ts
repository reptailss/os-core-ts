import {GmRenderImports, GmRenderModule, IGmModuleConstant, IGmRenderModuleConstant} from '@gm/core'

export class GmRenderModuleConstant extends GmRenderModule implements IGmRenderModuleConstant {

    private readonly moduleConstant: IGmModuleConstant
    private readonly gmRenderImports: GmRenderImports

    constructor(moduleConstant: IGmModuleConstant) {
        super(moduleConstant)
        this.moduleConstant = moduleConstant
        this.gmRenderImports = new GmRenderImports(moduleConstant)

    }

    public renderImports(): string {
        return this.gmRenderImports.renderImports()
    }

    public renderBody(): string {
        return this.moduleConstant.getBody()
    }

    public renderType(): string {
        if (!this.moduleConstant.getType()) {
            return ''
        }
        return `:${this.moduleConstant.getType()}`
    }

    public getData<T>(key: string): T {
        return this.moduleConstant.getRenderData(key)
    }

    public getExportMarkIfExported():string{
        if(this.moduleConstant.getExport()){
            return 'export'
        }
        return  ''
    }
}