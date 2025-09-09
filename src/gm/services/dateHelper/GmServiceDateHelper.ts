import {GmAbstractServiceFn, GmExport, GmModuleConstructorProp, IGmService} from '@gm/core'


export class GmServiceDateHelper extends GmAbstractServiceFn  implements IGmService {

    public getServiceName(): string {
        return 'DateHelper'
    }

    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'DateHelper',
            isLibImport: true,
        }
    }

    public getConstructorProp(): GmModuleConstructorProp | null {
        return  null
    }


    public getCurrentMonth(): string {
        return `DateHelper.getCurrentMonth()`
    }

    public getCurrentYear(): string {
        return `DateHelper.getCurrentYear()`
    }

}
