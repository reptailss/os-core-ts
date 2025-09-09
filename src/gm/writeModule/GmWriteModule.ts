import {GmCreateFile, IGmModule} from '@gm/core'


export class GmWriteModule {
    private readonly gmCreateFile: GmCreateFile

    constructor(
        module: IGmModule,
    ) {
        module.init()
        this.gmCreateFile = new GmCreateFile(module)
    }

    public run() {
        this.gmCreateFile.run()
    }

}
