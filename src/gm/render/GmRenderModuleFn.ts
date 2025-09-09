import {GmRenderImports, GmRenderModule, IGmModuleFn, IGmRenderModuleFn} from '@gm/core'

export class GmRenderModuleFn extends GmRenderModule implements IGmRenderModuleFn {

    private readonly moduleFn: IGmModuleFn
    private readonly gmRenderImports: GmRenderImports

    constructor(moduleFn: IGmModuleFn) {
        super(moduleFn)
        this.moduleFn = moduleFn
        this.gmRenderImports = new GmRenderImports(moduleFn)
    }

    public renderImports(): string {
        return this.gmRenderImports.renderImports()
    }

    public renderBody(): string {
        if (!this.moduleFn.getBodyElements()?.length) {
            return ''
        }

        return this.moduleFn.getBodyElements().map((elem) => {
            if (elem.hasEmptyLineAtEnd) {
                return `${elem.value}\n`
            }
            return elem.value
        })?.join('\n')
    }


    public renderReturnType(): string {
        if (!this.moduleFn.getReturnType()) {
            return ''
        }
        return `:${this.moduleFn.getReturnType()}`
    }

    public renderType(): string {
        if (!this.moduleFn.getType()) {
            return ''
        }
        return `:${this.moduleFn.getType()}`
    }

    public getData<T>(key: string): T {
        return this.moduleFn.getRenderData(key)
    }

    public renderProps(): string {
        if (!this.moduleFn.getProps()?.length) {
            return ''
        }
        switch (this.moduleFn.getPropsType()) {
            case 'default':
                return this.renderDefaultPropsType()
            case 'object':
                return this.renderObjectPropsType()
        }
    }

    public getExportMarkIfExported(): string {
        if (this.moduleFn.getExport()) {
            return 'export'
        }
        return ''
    }

    public renderAsyncType() {
        if (this.moduleFn.getAsyncType() === 'async') {
            return 'async'
        }
        return ''
    }

    private renderDefaultPropsType(): string {
        return this.moduleFn.getProps().map((prop) => {
            const varName = prop.optional ? `${prop.varName}?` : prop.varName
            const type = prop.nullable ? `${prop.type} | null` : prop.type
            return `${varName}:${type}`
        })?.join(',')

    }

    private renderObjectPropsType(): string {
        return `{${this.moduleFn.getProps().map((prop) => prop.varName).join(',')}}:{${this.renderDefaultPropsType()}}`
    }
}