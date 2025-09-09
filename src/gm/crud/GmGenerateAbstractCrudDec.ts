import {GmConfig} from '@gm'
import {GmModuleAppModule, GmWriteModule, IGmModuleClass} from '@gm/core'


export class GmGenerateAbstractCrudDec {

    private config: GmConfig
    private controllers: IGmModuleClass[] = []

    constructor(config: GmConfig, controllers: IGmModuleClass[]) {
        this.config = config
        this.controllers = controllers
    }


    public run() {

        if (!this.controllers.length) {
            return
        }

        this.controllers.forEach((controller) => {
            new GmWriteModule(controller).run()
        })

        new GmWriteModule(new GmModuleAppModule(
            this.config,
            this.controllers,
        )).run()

    }
}
