import {GmConfig} from '@gm'
import {
    GmImport,
    GmModuleDirType,
    GmModuleParentInfo,
    IGmModule,
    IGmModuleClass,
    IGmModuleConstant,
    IGmModuleFn,
    IGmModuleType,
    IGmService,
} from '@gm/core'
import {StringCaseHelper} from '@helpers'


export abstract class GmAbstractModule implements IGmModule {

    private config: GmConfig
    private childModules: IGmModule[] = []
    private modules: IGmModule[] = []
    private importsModules: GmImport[] = []
    private parentInfo: null | GmModuleParentInfo = null

    constructor(
        config: GmConfig,
    ) {
        this.config = config
    }

    abstract moduleType: 'constant' | 'class' | 'classMethod' | 'fn' | 'type'

    public abstract getPropertyName(): string

    public abstract getTemplatePath(): string

    public abstract init(): void

    public getConfig(): GmConfig {
        return this.config
    }

    public getRootModuleDirName(): string {
        return StringCaseHelper.toCamelCase(this.getConfig().moduleName)
    }

    public addService(service: IGmService): this {
        this.addImport(service.getExport())
        return this
    }

    public addModule(module: IGmModuleFn | IGmModuleConstant | IGmModuleType | IGmModuleClass, options: {
        hasAddImport?: boolean
    } = {hasAddImport: true}): this {
        module.init()
        this.modules.push(module)
        if (
            options?.hasAddImport !== false
        ) {
            const exportProperty = module.getExport()
            if (exportProperty) {
                this.addImport(exportProperty, module.getDirType())
            }

        }

        return this
    }

    public getModules(): IGmModule[] {
        return this.modules
    }


    public addChildModule(module: IGmModuleFn | IGmModuleConstant | IGmModuleType | IGmModuleClass): this {
        module.init()
        this.childModules.push(module)
        const exportProperty = module.getExport()
        if (exportProperty) {
            this.addImport(exportProperty, module.getDirType())
        }
        return this
    }


    public getChildModules(): IGmModule[] {
        return this.childModules
    }

    public addImport(
        data: GmImport,
        dirType?: GmModuleDirType,
    ): this {
        this.importsModules.push({
            dirType: data.dirType || dirType,
            propertyName: data.propertyName,
            isLibImport: data.isLibImport,
            path: data.path,
        })
        return this
    }

    public getImports() {
        return this.importsModules
    }

    public setParentInfo(info: GmModuleParentInfo): this {
        this.parentInfo = info
        return this
    }

    public getParentInfo(): GmModuleParentInfo | null {
        return this.parentInfo
    }


}
