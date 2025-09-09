import {GmAbstractServiceFn, GmExport, IGmService} from '@gm/core'

export class GmServiceStructureAccess extends GmAbstractServiceFn implements IGmService {

    public getServiceName(): string {
        return 'StructureAccessService'
    }

    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'StructureAccessService',
            isLibImport: true,
        }
    }

    public checkAccess(checkStructureAccessPropsVarName: String): string {
        return `StructureAccessService.checkAccess(${checkStructureAccessPropsVarName})`
    }

}
