import {GmAbstractServiceFn, GmExport, IGmService} from '@gm/core'

export class GmServicePaginationValues extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationResult',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'PaginationResult'
    }

    public getPaginationResultType(dtoType: string): string {
        return `PaginationResult<${dtoType}>`
    }

}
