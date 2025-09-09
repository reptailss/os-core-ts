import {
    GmImportStructureServiceEndpointDec,
    GmModuleGetStructureProps,
    GmServiceStructureAccess,
    IGmModuleClassMethod,
} from '@gm/core'
import {GmConfig} from '@gm'

type CallVarNames = {
    openUserId: string
    legalEntityId: string
}


export class GmAccessStructureMethodProcessor {

    private readonly gmServiceStructureAccess: GmServiceStructureAccess

    constructor(
        private readonly config: GmConfig,
        private readonly varNames: {
            add: CallVarNames,
            update: CallVarNames,
            delete: CallVarNames,
            get: CallVarNames,
            list: CallVarNames,
        },
    ) {

        this.gmServiceStructureAccess = new GmServiceStructureAccess()
    }


    public add(method: IGmModuleClassMethod) {
        const gmModuleGetStructureProps = new GmModuleGetStructureProps(this.config, this.varNames)

        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Add new ${this.config.dtoName.singular.toLowerCase()}`))
        method.addModule(gmModuleGetStructureProps)
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.add())}`,
        })
    }

    public update(method: IGmModuleClassMethod) {
        const gmModuleGetStructureProps = new GmModuleGetStructureProps(this.config, this.varNames)
        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Update ${this.config.dtoName.singular.toLowerCase()}`))
        method.addModule(gmModuleGetStructureProps)
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.update())}`,
        })
    }

    public delete(method: IGmModuleClassMethod) {
        const gmModuleGetStructureProps = new GmModuleGetStructureProps(this.config, this.varNames)

        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Delete ${this.config.dtoName.singular.toLowerCase()}`))
        method.addModule(gmModuleGetStructureProps)
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.delete())}`,
        })
    }

    public get(method: IGmModuleClassMethod) {
        const gmModuleGetStructureProps = new GmModuleGetStructureProps(this.config, this.varNames)

        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Get ${this.config.dtoName.singular.toLowerCase()}`))
        method.addModule(gmModuleGetStructureProps)
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.get())}`,
        })
    }

    public list(method: IGmModuleClassMethod) {
        const gmModuleGetStructureProps = new GmModuleGetStructureProps(this.config, this.varNames)

        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Get list ${this.config.dtoName.plural.toLowerCase()}`))
        method.addModule(gmModuleGetStructureProps)
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess(gmModuleGetStructureProps.api.list())}`,
        })
    }
}