import {
    GmAbstractModule,
    GmExport,
    GmFileWriteMode,
    GmModuleDirType,
    IGmModuleClass,
    IGmModuleConstant,
    IGmModuleFn,
    IGmModuleType,
} from '@gm/core'
import {AppError} from '@appError'


export abstract class GmAbstractModuleConstant extends GmAbstractModule implements IGmModuleConstant {

    public moduleType = 'constant' as const
    private renderData: Record<string, unknown> = {}

    private type: string = ''
    private body: string = ''

    private fileWriteModeGm: GmFileWriteMode = 'skipIfExists'
    private dirType: GmModuleDirType = 'modules'

    public abstract getDirName(): string | null

    public abstract getFileName(): string

    public getTemplatePath(): string {
        return 'modules/constant.ejs'
    }

    public setType(type: string): this {
        this.type = type
        return this
    }

    public getType(): string {
        return this.type
    }

    public setBody(body: string): this {
        this.body = body
        return this
    }

    public getBody(): string {
        return this.body
    }


    public addRenderData<T>(key: string, value: T): this {
        this.renderData[key] = value
        return this
    }

    public getRenderData<T>(key: string): T {
        if (!(key in this.renderData)) {
            throw new AppError(`Not found data ${key}`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        return this.renderData[key] as T
    }

    public getExport(): GmExport {
        const parentInfo = this.getParentInfo()
        if (!parentInfo?.dirName) {
            return {
                path: this.getFilePath(),
                propertyName: this.getPropertyName(),
            }
        }
        return {
            path: `${parentInfo.dirName}/${this.getFilePath()}`,
            propertyName: this.getPropertyName(),
        }
    }

    public getFileWriteMode(): GmFileWriteMode {
        return this.fileWriteModeGm
    }

    public setDirType(dirType: GmModuleDirType): this {
        this.dirType = dirType
        return this
    }

    public getDirType(): GmModuleDirType {
        return this.dirType
    }

    public setFileWriteMode(mode: GmFileWriteMode): this {
        this.fileWriteModeGm = mode
        return this
    }

    public getFilePath(): string {
        const dirName = this.getDirName()
        if (!dirName) {
            return this.getFileName()
        }
        return `${dirName}/${this.getFileName()}`
    }

    public addChildModule(module: IGmModuleFn | IGmModuleConstant | IGmModuleType | IGmModuleClass): this {
        const dirName = this.getDirName()
        if (dirName) {
            module.setParentInfo({
                dirName,
            })
        }
        return super.addChildModule(module)
    }

}
