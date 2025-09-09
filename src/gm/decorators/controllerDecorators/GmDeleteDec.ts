import {GmImport, IGmModuleClassMethodDecorator} from '@gm/core'

export class GmDeleteDec implements IGmModuleClassMethodDecorator {
    constructor(private readonly url: string) {
    }

    public getDecoratorName(): string {
        return 'DeleteDec'
    }

    public getProps(): string[] {
        return [this.url]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'DeleteDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
