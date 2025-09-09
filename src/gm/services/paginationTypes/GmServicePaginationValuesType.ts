import {GmAbstractServiceFn, GmExport, IGmService} from '@gm/core'

export class GmServicePaginationValuesType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationValues',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'PaginationValues'
    }

    public getPaginationValuesType(dtoType: string): string {
        return `PaginationValues<${dtoType}>`
    }

}
