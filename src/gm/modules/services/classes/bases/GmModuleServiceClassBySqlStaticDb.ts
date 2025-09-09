import {
    GmModuleAbstractServiceClass,
    GmModuleModelSqlByStaticDb,
    GmModuleModelType,
    GmModuleServiceClass,
    IGmModuleModel,
} from '@gm/core'
import {GmConfig} from '@gm'

const PROP_NAMES = {
    model: 'model',
} as const


export class GmModuleServiceClassBySqlStaticDb extends GmModuleAbstractServiceClass implements GmModuleServiceClass {

    private readonly model: GmModuleModelSqlByStaticDb
    private readonly modelType: GmModuleModelType


    constructor(
        config: GmConfig,
        className: string,
    ) {
        super(config, className)

        this.model = new GmModuleModelSqlByStaticDb(config, `this.${PROP_NAMES.model}`)
        this.modelType = new GmModuleModelType(config)
    }

    public getModuleModel(): IGmModuleModel {
        return this.model
    }

    public init(): void {
        this.addModule(this.model)
        this.addModule(this.modelType)
        this.addConstructorProp({
            varName: PROP_NAMES.model,
            type: this.modelType.getPropertyName(),
            defaultValue: this.model.getPropertyName(),
            privateReadOnly: true,
        })
    }

}