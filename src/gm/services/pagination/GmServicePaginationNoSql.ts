import {GmAbstractServiceFn, GmExport, IGmService} from '@gm/core'

export class GmServicePaginationNoSql extends GmAbstractServiceFn implements IGmService {

    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'ModelNoSqlPagination',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'ModelNoSqlPagination'
    }


    public getPagination({
                             paramsVarName,
                             dateStartVarName,
                             dateEndVarName,
                             getModelCbVarName,
                         }: {
        paramsVarName: string,
        dateStartVarName: string,
        dateEndVarName: string,
        getModelCbVarName: string,
    }): string {
        const paramsStr = paramsVarName === 'params' ? paramsVarName : `params:${paramsVarName}`
        const dateStartStr = dateStartVarName === 'dateStart' ? dateStartVarName : `dateStart:${dateStartVarName}`
        const dateEndStr = dateEndVarName === 'dateEnd' ? dateEndVarName : `dateEnd:${dateEndVarName}`
        const getModelCbStr = getModelCbVarName === 'getModelCb' ? getModelCbVarName : `getModelCb:${getModelCbVarName}`
      return `ModelNoSqlPagination.byYearAndMoth({
            ${paramsStr},
            ${dateStartStr},
            ${dateEndStr},
            ${getModelCbStr}
        })
        `
    }

}
