import {
    GmAbstractModule,
    GmBodyElement,
    GmExport,
    GmFileWriteMode, GmModuleDirType,
    GmModuleFnProp,
    GmModulePropsType, IGmModuleClass, IGmModuleConstant,
    IGmModuleFn, IGmModuleType,
} from '@gm/core'
import {AppError} from '@appError'


export abstract class GmAbstractModuleFn extends GmAbstractModule implements IGmModuleFn {

    public moduleType = 'fn' as const

    private returnType: string = ''
    private type: string = ''
    private bodyElements: GmBodyElement[] = []
    private props: GmModuleFnProp[] = []
    private propsType: GmModulePropsType = 'default'
    private renderData: Record<string, unknown> = {}
    private asyncType: 'sync' | 'async' = 'sync'

    private fileWriteModeGm: GmFileWriteMode = 'skipIfExists'
    private dirType: GmModuleDirType = 'modules'

    public abstract getDirName(): string | null

    public abstract getFileName(): string

    public getTemplatePath(): string {
        return 'modules/fn.ejs'
    }

    public setType(type: string): this {
        this.type = type
        return this
    }

    public getType(): string {
        return this.type
    }

    public setReturnType(returnType: string): this {
        this.returnType = returnType
        return this
    }

    public getReturnType(): string {
        return this.returnType
    }

    public appendBodyElement(bodyElement: GmBodyElement): this {
        this.bodyElements.push(bodyElement)
        return this
    }

    public prependBodyElement(bodyElement: GmBodyElement):this{
        this.bodyElements.unshift(bodyElement)
        return this
    }

    public getBodyElements(): GmBodyElement[] {
        return this.bodyElements
    }

    public addProp(prop: GmModuleFnProp): this {
        this.props.push(prop)
        return this
    }

    public getProps(): GmModuleFnProp[] {
        return this.props
    }

    public setPropsType(type: GmModulePropsType): this {
        this.propsType = type
        return this
    }

    public getPropsType(): GmModulePropsType {
        return this.propsType
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

    public setAsyncType(type: 'sync' | 'async'): this {
        this.asyncType = type
        return this
    }

    public getAsyncType() {
        return this.asyncType
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
