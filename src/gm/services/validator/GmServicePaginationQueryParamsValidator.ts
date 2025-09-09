import {GmExport, IGmService} from '@gm/core'

export class GmServicePaginationQueryParamsValidator implements IGmService {
    public serviceType = 'fn' as const


    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationQueryParamsValidator',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'PaginationQueryParamsValidator'
    }


    public getSchema(dtoSchema: string) {
        return `PaginationQueryParamsValidator.getSchema(
           ${dtoSchema}
        )`
    }


}
