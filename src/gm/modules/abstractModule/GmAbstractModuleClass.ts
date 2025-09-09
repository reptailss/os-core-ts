import {
    GmAbstractModule,
    GmExport,
    GmFileWriteMode,
    GmModuleClassVar,
    GmModuleConstructorProp,
    GmModuleDirType,
    IGmModuleClass,
    IGmModuleClassDecorator,
    IGmModuleClassMethod,
    IGmModuleConstant,
    IGmModuleFn,
    IGmModuleType,
    IGmServiceClass,
    IGmServiceFn,
} from '@gm/core'
import {AppError} from '@appError'


export abstract class GmAbstractModuleClass extends GmAbstractModule implements IGmModuleClass {

    public moduleType = 'class' as const

    private constructorProps: GmModuleConstructorProp[] = []
    private methods: IGmModuleClassMethod[] = []
    private decorators: IGmModuleClassDecorator[] = []
    private vars: GmModuleClassVar[] = []
    private elementsBeforeClass: string[] = []

    private fileWriteModeGm: GmFileWriteMode = 'skipIfExists'
    private dirType: GmModuleDirType = 'modules'

    public abstract getDirName(): string | null

    public abstract getFileName(): string

    public getTemplatePath(): string {
        return 'modules/class.ejs'
    }

    public addConstructorProp(constructorProp: GmModuleConstructorProp): this {
        this.constructorProps.push(constructorProp)
        return this
    }

    public getConstructorProps(): GmModuleConstructorProp[] {
        return this.constructorProps
    }

    public addMethod(method: IGmModuleClassMethod): this {
        method.init()
        if (method.getImports().length) {
            method.getImports().forEach(imp => {
                this.addImport(imp)
            })
        }
        this.methods.push(method)

        return this
    }

    public getMethods(): IGmModuleClassMethod[] {
        return this.methods
    }

    public getMethodByIndex(index: number): IGmModuleClassMethod {
        if (index > this.getMethods().length - 1) {
            throw new AppError('Not found method by index')
        }
        return this.getMethods()[index]
    }

    public addDecorator(decorator: IGmModuleClassDecorator): this {
        this.decorators.push(decorator)
        this.addImport(decorator.getImport())
        return this
    }

    public getDecorators(): IGmModuleClassDecorator[] {
        return this.decorators
    }

    public addService(service: IGmServiceFn | IGmServiceClass): this {
        if (service.serviceType === 'class') {
            this.addConstructorProp(service.getConstructorProp())
        }
        return super.addService(service)
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

    public addVar(gmVar: GmModuleClassVar): this {
        this.vars.push(gmVar)
        return this
    }

    public getVars(): GmModuleClassVar[] {
        return this.vars
    }

    public addElementBeforeClass(value: string): this {
        this.elementsBeforeClass.push(value)
        return this
    }

    public getElementsBeforeClass(): string[] {
        return this.elementsBeforeClass
    }

}
