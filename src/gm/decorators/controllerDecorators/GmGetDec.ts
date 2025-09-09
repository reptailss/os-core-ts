import {GmImport, IGmModuleClassMethodDecorator} from '@gm/core'

export class GmGetDec implements IGmModuleClassMethodDecorator {
    constructor(private readonly url: string) {
    }

    public getDecoratorName(): string {
        return 'GetDec'
    }

    public getProps(): string[] {
        return [this.url]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'GetDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
