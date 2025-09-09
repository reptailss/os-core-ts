import {IGmModule, IGmRenderModule} from '@gm/core'

export class GmRenderModule implements IGmRenderModule {

    private readonly module: IGmModule


    constructor(module: IGmModule) {
        this.module = module
    }

    public renderPropertyName(): string {
        return this.module.getPropertyName()
    }


}