import {GmImport} from '@gm/core'

export interface IGmModuleClassMethodDecorator{

    getDecoratorName(): string

    getProps():string[]

    getImport(): GmImport
}