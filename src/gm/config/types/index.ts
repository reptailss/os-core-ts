import {GmModelNoSqlColumn, GmModelSqlColumn} from '@gm'


export type GmConfig = {
    dtoName: {
        singular: string
        plural: string
    }
    moduleName: string
    model: GmModelConfig
    endpoints: GmEndpointsConfig
    hasSeparated:boolean
    rootDir?:string
}


type GmModelConfig = GmSqlModelConfig | GmNoSqlModelConfig

export type GmSqlModelConfig = {
    columns: Record<string, GmModelSqlColumn>
    dbType: 'sql'
    type: 'dynamicByDomain' | 'dynamicDbConfigByLegalEntityId' | 'staticByDbConnection'
}

export type GmNoSqlModelConfig = {
    columns: Record<string, GmModelNoSqlColumn>
    dbType: 'noSql'
    type: 'byDatabaseNameAndYearMonth'
}


export type GmEndpointsConfig = {
    add: GmEndpointConfigAction,
    delete: GmEndpointConfigAction,
    update: GmEndpointConfigAction,
    list: GmEndpointConfig,
    get: GmEndpointConfig,
}

export type GmEndpointConfig = {
    hasAuth: boolean
    hasStructureAccess:boolean

}
export type GmEndpointConfigAction = GmEndpointConfig & {
    hasActionLogger: boolean
}


export type GmEndpointType = 'add' | 'delete' | 'update' | 'list' | 'get'
