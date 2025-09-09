import {
    GmModuleAbstractServiceClass,
    GmModuleModelSqlByDynamicLeId,
    GmModuleModelType,
    IGmModuleClass,
    IGmModuleClassMethod,
    IGmModuleModel,
} from '@gm/core'
import {GmConfig} from '@gm'

const PROP_NAMES = {
    model: 'model',
    getModelCb: 'getModelCb',
    legalEntityId: 'legalEntityId',
}

export class GmModuleServiceClassBySqlDynamicLeId extends GmModuleAbstractServiceClass implements IGmModuleClass {

    private readonly model: GmModuleModelSqlByDynamicLeId
    private readonly modelType: GmModuleModelType

    constructor(
        config: GmConfig,
        serviceName: string,
    ) {
        super(config, serviceName)
        this.model = new GmModuleModelSqlByDynamicLeId(
            config,
            {
                modelVarName: PROP_NAMES.model,
                getModelCbVarName: `this.${PROP_NAMES.getModelCb}`,
                leIdVarName: PROP_NAMES.legalEntityId,
            },
        )
        this.modelType = new GmModuleModelType(config)

    }

    public getModuleModel(): IGmModuleModel {
        return this.model
    }

    public addAndInitMethod(method: IGmModuleClassMethod, leIdVarName: string): this {
        method.prependBodyElement({
            name: 'init model',
            value: `const ${PROP_NAMES.model} = await ${this.model.getInitModel()}`,
        })
        method.addProp({
            varName: PROP_NAMES.legalEntityId,
            decorator: null,
            type: 'number',
            callVarName: leIdVarName,

        })
        method.setPropsType('object')
        this.addMethod(method)
        return this
    }

    public init(): void {

        this.addModule(this.model)
        this.addModule(this.modelType)

        this.addConstructorProp({
            varName: PROP_NAMES.getModelCb,
            type: this.modelType.getPropertyName(),
            defaultValue: this.model.getPropertyName(),
            privateReadOnly: true,
        })
    }

}