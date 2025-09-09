import {GmAbstractServiceClass, GmExport, GmModuleConstructorProp, IGmServiceClass} from '@gm/core'


export class GmServiceActionsLoggerService extends GmAbstractServiceClass implements IGmServiceClass {

    public getServiceName(): string {
        return 'ActionsLoggerService'
    }

    public getConstructorProp(): GmModuleConstructorProp {
        return {
            varName: 'actionsLoggerService',
            type: this.getServiceName(),
            privateReadOnly: true,
            defaultValue: `new ${this.getServiceName()}()`,
        }
    }

    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: this.getServiceName(),
            isLibImport: true,
        }
    }

    public logCreateAction({
                               value,
                               rowId,
                               initiatorOpenUserId,
                               config,
                           }: {
        value: string
        config: string
        rowId: string
        initiatorOpenUserId: string
    }) {
        return `
             this.actionsLoggerService.logCreateAction({
                 value: ${value},
                 openUserId: ${initiatorOpenUserId},
                 config: ${config},
                 rowId: ${rowId}
              })`
    }

    public logUpdateAction({
                               oldValue,
                               newValue,
                               config,
                               rowId,
                               initiatorOpenUserId,
                           }: {
        oldValue: string
        newValue: string
        config: string
        rowId: string
        initiatorOpenUserId: string
    }): string {
        return `
             this.actionsLoggerService.logUpdateAction({
                 oldValue: ${oldValue},
                 newValue: ${newValue},
                 openUserId: ${initiatorOpenUserId},
                 config: ${config},
                 rowId: ${rowId}
              })`
    }

    public logDeleteAction({
                               oldValue,
                               initiatorOpenUserId,
                               config,
                               rowId,
                           }: {
        oldValue: string
        config: string
        rowId: string
        initiatorOpenUserId: string
    }) {
        return `
             this.actionsLoggerService.logDeleteAction({
                 oldValue: ${oldValue},
                 openUserId: ${initiatorOpenUserId},
                 config: ${config},
                 rowId: ${rowId}
              })`
    }


}
