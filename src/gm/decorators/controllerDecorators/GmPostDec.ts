import {GmImport, IGmModuleClassMethodDecorator} from '@gm/core'


export class GmPostDec implements IGmModuleClassMethodDecorator {
    constructor(private readonly url: string) {
    }

    public getDecoratorName(): string {
        return 'PostDec'
    }

    public getProps(): string[] {
        return [this.url]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'PostDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
