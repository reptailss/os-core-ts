import {GmImport, IGmModuleClassMethodDecorator} from '@gm/core'

export class GmImportStructureServiceEndpointDec implements IGmModuleClassMethodDecorator {

    constructor(private readonly name: string) {
    }

    public getDecoratorName(): string {
        return 'ImportStructureServiceEndpointDec'
    }

    public getProps(): string[] {
        return [`'${this.name}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'ImportStructureServiceEndpointDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
