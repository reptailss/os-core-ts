import {GmExport} from '@gm/core'

export interface IGmService {
    serviceType: 'fn' | 'class'

    getExport(): GmExport

    getServiceName(): string

}

