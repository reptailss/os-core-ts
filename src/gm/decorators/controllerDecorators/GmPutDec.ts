import {GmImport, IGmModuleClassMethodDecorator} from '@gm/core'


export class GmPutDec implements IGmModuleClassMethodDecorator {
    constructor(private readonly url: string) {
    }

    public getDecoratorName(): string {
        return 'PutDec'
    }

    public getProps(): string[] {
        return [this.url]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'PutDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
