import {GmImport, IGmModuleClassMethodPropDecorator} from '@gm/core'

export class GmBodyDec implements IGmModuleClassMethodPropDecorator {

    constructor(private readonly schemaVarName: string) {
    }

    public getDecoratorName(): string {
        return 'BodyDec'
    }

    public getProps(): string[] {
        return [this.schemaVarName]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'BodyDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
