import {GmImport, IGmModuleClassMethodPropDecorator} from '@gm/core'

export class GmAuthDec implements IGmModuleClassMethodPropDecorator {

    public getDecoratorName(): string {
        return 'AuthDec'
    }

    public getProps(): string[] {
        return []
    }

    public getImport(): GmImport {
        return {
            propertyName: 'AuthDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
