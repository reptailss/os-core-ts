import {
    GmModuleAbstractServiceClass,
    GmModuleModelSqlByDynamicDomain,
    GmModuleModelType,
    IGmModuleClass,
    IGmModuleClassMethod,
    IGmModuleModel,
} from '@gm/core'
import {GmConfig} from '@gm'

const PROP_NAMES = {
    model: 'model',
    getModelCb: 'getModelCb',
    domain: 'domain',
}

export class GmModuleServiceClassBySqlDynamicDomain extends GmModuleAbstractServiceClass implements IGmModuleClass {


    private readonly model: GmModuleModelSqlByDynamicDomain
    private readonly modelType: GmModuleModelType

    constructor(
        config: GmConfig,
        serviceName: string,
    ) {
        super(config, serviceName)
        this.model = new GmModuleModelSqlByDynamicDomain(
            config,
            {
                modelVarName: PROP_NAMES.model,
                getModelCbVarName: `this.${PROP_NAMES.getModelCb}`,
                domainVarName: PROP_NAMES.domain,
            },
        )
        this.modelType = new GmModuleModelType(config)

    }

    public getModuleModel(): IGmModuleModel {
        return this.model
    }

    public addAndInitMethod(method: IGmModuleClassMethod, domainVarName: string): this {
        method.prependBodyElement({
            name: 'init model',
            value: `const ${PROP_NAMES.model} = await ${this.model.getInitModel()}`,
        })
        method.addProp({
            varName: PROP_NAMES.domain,
            callVarName: domainVarName,
            decorator: null,
            type: 'string',
        })
        method.setPropsType('object')
        this.addMethod(method)
        return  this
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