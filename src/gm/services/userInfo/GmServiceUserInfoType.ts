import {GmAbstractServiceFn, GmExport, IGmService} from '@gm/core'

export class GmServiceUserInfoType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'UserInfo',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'UserInfo'
    }

    getUserInfoType(): string {
        return `UserInfo`
    }

}
