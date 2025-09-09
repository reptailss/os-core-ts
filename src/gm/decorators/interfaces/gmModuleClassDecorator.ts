import {GmImport} from '@gm/core'

export interface IGmModuleClassDecorator{

    getDecoratorName(): string

    getProps():string[]

    getImport(): GmImport
}