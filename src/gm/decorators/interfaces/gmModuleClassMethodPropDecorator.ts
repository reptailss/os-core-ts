import {GmImport} from '@gm/core'

export interface IGmModuleClassMethodPropDecorator{

    getDecoratorName(): string

    getProps():string[]

    getImport(): GmImport
}