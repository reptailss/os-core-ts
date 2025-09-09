import {GmImport, IGmModuleClassMethodPropDecorator} from '@gm/core'


export class GmQueryParamNumDec implements IGmModuleClassMethodPropDecorator {
    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'QueryParamNumDec'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'QueryParamNumDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}

export class GmQueryParamDec implements IGmModuleClassMethodPropDecorator {
    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'QueryParamDec'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'QueryParamDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}


export class GmQueryParamDateDec implements IGmModuleClassMethodPropDecorator {
    constructor(private readonly key: string) {
    }

    public getDecoratorName(): string {
        return 'QueryParamDateDec'
    }

    public getProps(): string[] {
        return [`'${this.key}'`]
    }

    public getImport(): GmImport {
        return {
            propertyName: 'QueryParamDateDec',
            path: 'os-core-ts',
            isLibImport: true,
        }
    }
}
