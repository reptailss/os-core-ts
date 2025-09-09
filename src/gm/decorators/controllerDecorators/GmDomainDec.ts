import {GmImport, IGmModuleClassMethodDecorator} from '@gm/core'

export class GmDomainDec implements IGmModuleClassMethodDecorator {

    public getDecoratorName(): string {
        return 'DomainDec'
    }

    public getProps(): string[] {
        return []
    }

    public getImport(): GmImport {
        return {
            propertyName: 'DomainDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
