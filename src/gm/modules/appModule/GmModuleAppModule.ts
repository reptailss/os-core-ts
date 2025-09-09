import {GmAbstractModuleConstant, IGmModuleClass, IGmModuleConstant} from '@gm/core'
import {GmConfig} from '@gm'
import {StringCaseHelper} from '@helpers'

export class GmModuleAppModule extends GmAbstractModuleConstant implements IGmModuleConstant {

    private controllers: IGmModuleClass[]

    constructor(
        config: GmConfig,
        controllers: IGmModuleClass[],
    ) {
        super(config)
        this.controllers = controllers
    }

    public getPropertyName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}AppModule`
    }

    public getDirName(): string | null {
        return '/'
    }

    public getFileName(): string {
        return `${this.getPropertyName()}.ts`
    }

    public init(): void {
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'AppModule',
            isLibImport: true,
        })

        const controllersName: string[] = []

        if (this.controllers.length) {
            this.controllers.forEach((controller) => {
                const exportProp = controller.getExport()
                if (exportProp) {
                    this.addImport(exportProp)
                }
                controllersName.push(controller.getPropertyName())
            })

        }
        const tag = StringCaseHelper.toKebabCase(this.getConfig().dtoName.plural)
        this.setBody(`
        new AppModule({
            controllers: [${controllersName.join(',')}],
            swaggerInfo:{
                tag:'${tag.charAt(0).toUpperCase() + tag.slice(1)}'
            }
        })`)
    }


}
