import {
    GmRenderImports,
    GmRenderModule,
    GmRenderModuleClassMethod,
    IGmModuleClass,
    IGmRenderModuleClass,
} from '@gm/core'

export class GmRenderModuleClass extends GmRenderModule implements IGmRenderModuleClass {

    private readonly moduleClass: IGmModuleClass
    private readonly gmRenderImports: GmRenderImports

    constructor(moduleClass: IGmModuleClass) {
        super(moduleClass)
        this.moduleClass = moduleClass
        this.gmRenderImports = new GmRenderImports(moduleClass)

    }

    public renderImports(): string {
        return this.gmRenderImports.renderImports()
    }

    public renderConstructorProps(): string {
        if (!this.moduleClass.getConstructorProps()?.length) {
            return ''
        }
        return this.moduleClass.getConstructorProps().map((prop) => {
            const varName = prop.optional ? `${prop.varName}?` : prop.varName
            const type = prop.nullable ? `${prop.type} | null` : prop.type
            const defaultValue = prop.defaultValue ? ` = ${prop.defaultValue}` : ''
            if (prop.privateReadOnly) {
                return `private readonly ${varName}:${type}${defaultValue}`
            }
            return `${varName}:${type}${defaultValue}`
        })?.join(',')
    }


    public renderDecorators(): string {
        return this.moduleClass.getDecorators().map((decorator) => {

            if (!decorator.getProps().length) {
                return `@${decorator.getDecoratorName()}`
            }

            return `@${decorator.getDecoratorName()}(${decorator.getProps().join(',')})`
        })?.join('\n')
    }

    public getExportMarkIfExported(): string {
        if (this.moduleClass.getExport()) {
            return 'export'
        }
        return ''
    }

    public renderClass() {
        return `
        ${this.renderImports()}
        
        ${this.renderElementsBeforeClass()}
        
        ${this.renderDecorators()}
        ${this.getExportMarkIfExported()} class ${this.renderPropertyName()} {
            \n
            constructor(${this.renderConstructorProps()}){}
             \n
             \n
             ${this.renderVars()}
               \n
            ${this.renderStringMethods()}
        }
        `
    }

    private renderElementsBeforeClass():string{
        if(!this.moduleClass.getElementsBeforeClass().length){
            return  ''
        }
        return this.moduleClass.getElementsBeforeClass().join('\n')
    }

    private renderVars():string{
       if(!this.moduleClass.getVars().length){
           return  ''
       }
       return  this.moduleClass.getVars().map((gmVar)=>{
           const readonly = gmVar.readonly ? 'readonly' : ''
           const defaultValue = gmVar.defaultValue ? ` = ${gmVar.defaultValue}` : ''
           const type = gmVar.type ? ` :${gmVar.type}` : ''
           return `${gmVar.scope} ${readonly} ${gmVar.varName} ${type}${defaultValue}`
       }).join('\n')
    }
    private renderStringMethods() {
        if (!this.moduleClass.getMethods().length) {
            return ''
        }
        return this.moduleClass.getMethods().map((method) => {
            const gmRenderModuleClassMethod = new GmRenderModuleClassMethod(method)

            return `
            ${gmRenderModuleClassMethod.renderDecorators()}
            ${gmRenderModuleClassMethod.renderScope()} ${gmRenderModuleClassMethod.renderAsyncType()} ${gmRenderModuleClassMethod.renderPropertyName()} (${gmRenderModuleClassMethod.renderProps()}) ${gmRenderModuleClassMethod.renderReturnType()}{
                ${gmRenderModuleClassMethod.renderBody()}
           }
            `
        }).join('\n\n')
    }



}