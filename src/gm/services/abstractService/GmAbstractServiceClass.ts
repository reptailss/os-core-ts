import {GmExport, GmModuleConstructorProp, IGmServiceClass} from '@gm/core'

export abstract class GmAbstractServiceClass implements IGmServiceClass {
    public serviceType = 'class' as const

    public abstract getServiceName(): string

    public abstract getExport(): GmExport

    public abstract getConstructorProp(): GmModuleConstructorProp
}