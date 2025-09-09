import {
    GmAbstractModuleClass,
    GmAbstractModuleClassMethod,
    GmModuleRoutePaths,
    IGmModuleClass,
    IGmModuleClassMethod,
} from '@gm/core'
import {StringCaseHelper} from '@helpers'
import {GmConfig} from '@gm'

type CallVarNames = {
    openUserId: string
    legalEntityId: string
}

class GmModuleAbstractMethodGetStructureProps extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private gmModuleRoutePaths: GmModuleRoutePaths

    constructor(
        config: GmConfig,
        private readonly methodName: 'add' | 'update' | 'delete' | 'get' | 'list',
        private readonly callVarNames: CallVarNames,
    ) {
        super(config)
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)
    }

    public getPropertyName(): string {
        return this.methodName
    }

    public init(): void {
        this.addModule(this.gmModuleRoutePaths)
        this.setMethodScope('static')
        this.setAsyncType('sync')
        this.setPropsType('object')
        this.addProp({
            type: 'number',
            varName: 'openUserId',
            callVarName: this.callVarNames.openUserId,
            decorator: null,
        })
        this.addProp({
            type: 'number',
            varName: 'legalEntityId',
            callVarName: this.callVarNames.legalEntityId,
            decorator: null,
        })
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'CheckStructureAccessProps',
        })
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'StructureServiceEndpointsHelper',
        })

        this.setReturnType('CheckStructureAccessProps')

        this.appendBodyElement({
            name: 'returnProps',
            value: `
                return {
                    service,
                    endpoint:StructureServiceEndpointsHelper.getEndpointKeyFromRoutePath(${this.gmModuleRoutePaths.getRoutePathPropertyName(this.methodName)}),
                    legalEntityId,
                    openUserId,
                }
            `,
        })
    }
}

class GmModuleCreateMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(
        config: GmConfig,
        callVarNames: CallVarNames,
    ) {
        super(config, 'add', callVarNames)
    }
}

class GmModuleUpdateMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(
        config: GmConfig,
        callVarNames: CallVarNames,
    ) {
        super(config, 'update', callVarNames)
    }
}

class GmModuleDeleteMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(
        config: GmConfig,
        callVarNames: CallVarNames,
    ) {
        super(config, 'delete', callVarNames)
    }
}

class GmModuleGetByIdMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(
        config: GmConfig,
        callVarNames: CallVarNames,
    ) {
        super(config, 'get', callVarNames)
    }
}

class GmModuleListMethodGetStructureProps extends GmModuleAbstractMethodGetStructureProps {
    constructor(
        config: GmConfig,
        callVarNames: CallVarNames,
    ) {
        super(config, 'list', callVarNames)
    }
}


export class GmModuleGetStructureProps extends GmAbstractModuleClass implements IGmModuleClass {

    public api: {
        add: () => string
        update: () => string
        delete: () => string
        get: () => string
        list: () => string
    }

    constructor(
        config: GmConfig,
        private readonly varNames: {
            add: CallVarNames,
            update: CallVarNames,
            delete: CallVarNames,
            get: CallVarNames,
            list: CallVarNames,
        },
    ) {
        super(config)
        if (config.model.type === 'byDatabaseNameAndYearMonth') {
            this.api = {
                add: () => `${this.getPropertyName()}.${this.getMethodByIndex(0).renderMethodCall()}`,
                update: () => '',
                delete: () => '',
                get: () => '',
                list: () => `${this.getPropertyName()}.${this.getMethodByIndex(1).renderMethodCall()}`,
            }
        } else {
            this.api = {
                add: () => `${this.getPropertyName()}.${this.getMethodByIndex(0).renderMethodCall()}`,
                update: () => `${this.getPropertyName()}.${this.getMethodByIndex(1).renderMethodCall()}`,
                delete: () => `${this.getPropertyName()}.${this.getMethodByIndex(2).renderMethodCall()}`,
                get: () => `${this.getPropertyName()}.${this.getMethodByIndex(3).renderMethodCall()}`,
                list: () => `${this.getPropertyName()}.${this.getMethodByIndex(4).renderMethodCall()}`,
            }
        }


    }

    public getPropertyName(): string {
        return `Get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}StructureProps`
    }

    public getDirName(): string | null {
        return 'structure'
    }

    public getFileName(): string {
        return `${this.getPropertyName()}.ts`
    }


    public init(): void {

        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OsCoreAppConfig',
        })
        this.addElementBeforeClass('const service = OsCoreAppConfig.getServiceKey()')

        if (this.getConfig().model.type === 'byDatabaseNameAndYearMonth') {
            this.addMethod(new GmModuleCreateMethodGetStructureProps(
                    this.getConfig(),
                    this.varNames.add,
                ),
            )
            this.addMethod(new GmModuleListMethodGetStructureProps(
                    this.getConfig(),
                    this.varNames.list,
                ),
            )
        } else {
            this.addMethod(new GmModuleCreateMethodGetStructureProps(
                    this.getConfig(),
                    this.varNames.add,
                ),
            )
            this.addMethod(new GmModuleUpdateMethodGetStructureProps(
                    this.getConfig(),
                    this.varNames.update,
                ),
            )
            this.addMethod(new GmModuleDeleteMethodGetStructureProps(
                    this.getConfig(),
                    this.varNames.delete,
                ),
            )
            this.addMethod(new GmModuleGetByIdMethodGetStructureProps(
                    this.getConfig(),
                    this.varNames.get,
                ),
            )
            this.addMethod(new GmModuleListMethodGetStructureProps(
                    this.getConfig(),
                    this.varNames.list,
                ),
            )
        }

    }

}


