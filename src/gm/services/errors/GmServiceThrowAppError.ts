import {GmAbstractServiceFn, GmExport, GmModuleConstructorProp, IGmService} from '@gm/core'
import {AppErrorKey} from '@appError'


export class GmServiceThrowAppError extends GmAbstractServiceFn implements IGmService {

    public getServiceName(): string {
        return 'AppError'
    }

    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'AppError',
            isLibImport: true,
        }
    }

    public throwAppError({
                             message,
                             errorKey,
                             ifConstruction,

                         }: {
        message: string,
        errorKey: AppErrorKey,
        ifConstruction?: string
    }): string {
        if (ifConstruction) {
            return `if(${ifConstruction}){
                        throw new AppError('${message}',\n{ \nerrorKey:'${errorKey}'})
                    }`
        }
        return `throw new AppError('${message}',\n{ errorKey:'${errorKey}'})`
    }
}
