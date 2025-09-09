import {GmAbstractServiceFn, GmExport, IGmService} from '@gm/core'

export class GmServiceRowResultType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'RowResult',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'RowResult'
    }


    public getRowResultType(baseType: string): string {
        return `RowResult<${baseType}>`
    }

}
