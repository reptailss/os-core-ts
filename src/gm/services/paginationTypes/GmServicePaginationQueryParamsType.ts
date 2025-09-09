import {GmAbstractServiceFn, GmExport, IGmService} from '@gm/core'

export class GmServicePaginationQueryParamsType extends GmAbstractServiceFn implements IGmService {

    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationQueryParams',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'PaginationQueryParams'
    }


    public getPaginationQueryParamsType(dtoType: string): string {
        return `PaginationQueryParams<${dtoType}>`
    }

}
