import {GmImport, IGmModuleClassDecorator} from '@gm/core'

export class GmControllerDec implements IGmModuleClassDecorator {
    public getDecoratorName(): string {
        return 'ControllerDec()'
    }

    public getProps(): string[] {
        return []
    }

    public getImport(): GmImport {
        return {
            propertyName: 'ControllerDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
