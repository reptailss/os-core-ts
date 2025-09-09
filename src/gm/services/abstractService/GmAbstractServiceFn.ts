import {GmExport, IGmServiceFn} from '@gm/core'

export abstract class GmAbstractServiceFn implements IGmServiceFn {
    public serviceType = 'fn' as const

    public abstract getServiceName(): string

    public abstract getExport(): GmExport
}