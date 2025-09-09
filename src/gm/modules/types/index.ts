import {IGmModuleClassMethodPropDecorator} from '@gm/core'

export type GmModuleParentInfo = {
    dirName: string | null
}

export type GmModuleClassMethodProp = {
    varName: string
    callVarName: string
    type: string
    optional?: boolean
    nullable?: boolean
    decorator: IGmModuleClassMethodPropDecorator | null
}

export type GmModuleClassMethodPropDecorator = {
    varName: string
    type: string
    optional?: boolean
    nullable?: boolean
    decorator: IGmModuleClassMethodPropDecorator
}

export type GmModuleFnProp = {
    varName: string
    type: string
    optional?: boolean
    nullable?: boolean
}

export type GmModuleConstructorProp = {
    varName: string
    type: string
    privateReadOnly: boolean
    defaultValue: string | null
    optional?: boolean
    nullable?: boolean
}

export type GmModulePropsType = 'default' | 'object'

export type GmFileWriteMode = 'skipIfExists' | 'appendBefore' | 'appendAfter' | 'overwrite'

export interface GmBodyElement {
    value: string
    name: string
    hasEmptyLineAtEnd?: boolean
}


export type GmModuleDirType = 'modules' | 'root'

export type GmModuleClassVar = {
    varName:string
    type: string | null
    scope: 'public' | 'private' | 'static'
    readonly: boolean
    defaultValue: string | null
    optional?: boolean
    nullable?: boolean
}
