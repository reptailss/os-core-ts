import {
    GmRenderModule,
    IGmModuleClassMethod,
    IGmModuleClassMethodPropDecorator,
    IGmRenderModuleClassMethod,
} from '@gm/core'

export class GmRenderModuleClassMethod extends GmRenderModule implements IGmRenderModuleClassMethod {

    private readonly moduleClassMethod: IGmModuleClassMethod

    constructor(moduleClassMethod: IGmModuleClassMethod) {
        super(moduleClassMethod)
        this.moduleClassMethod = moduleClassMethod

    }

    public renderBody(): string {
        if (!this.moduleClassMethod.getBodyElements()?.length) {
            return ''
        }

        return this.moduleClassMethod.getBodyElements().map((elem) => {
            if (elem.hasEmptyLineAtEnd) {
                return `${elem.value}\n`
            }
            return elem.value
        })?.join('\n')
    }


    public renderReturnType(): string {
        if (!this.moduleClassMethod.getReturnType()) {
            return ''
        }
        return `:${this.moduleClassMethod.getReturnType()}`
    }

    public getData<T>(key: string): T {
        return this.moduleClassMethod.getRenderData(key)
    }

    public renderProps(): string {
        switch (this.moduleClassMethod.getPropsType()) {
            case 'default':
                return this.renderDefaultPropsType()
            case 'object':
                return this.renderObjectPropsType()
        }
    }

    public renderAsyncType() {
        if (this.moduleClassMethod.getAsyncType() === 'async') {
            return 'async '
        }
        return ''
    }

    public renderScope(): string {
        return this.moduleClassMethod.getMethodScope()
    }

    public renderDecorators() {
        if (!this.moduleClassMethod.getDecorators().length) {
            return ''
        }
        return this.moduleClassMethod.getDecorators().map((decorator) => {
            if (!decorator.getProps().length) {
                return `@${decorator.getDecoratorName()}`
            }
            return `@${decorator.getDecoratorName()}(${decorator.getProps().join(',')})`
        }).join('\n')
    }

    private renderDefaultPropsType(): string {
        const res: string[] = []

        if (this.moduleClassMethod.getProps().length) {
            this.moduleClassMethod.getProps().forEach((prop) => {
                const varName = prop.optional ? `${prop.varName}?` : prop.varName
                const type = prop.nullable ? `${prop.type} | null` : prop.type
                if (prop.decorator) {
                    res.push(`${this.renderPropDecorator(prop.decorator)} ${varName}:${type}`)
                }else{
                    res.push(`${varName}:${type}`)
                }

            })
        }
        if (this.moduleClassMethod.getPropDecorators().length) {
            this.moduleClassMethod.getPropDecorators().forEach((prop) => {
                const varName = prop.optional ? `${prop.varName}?` : prop.varName
                const type = prop.nullable ? `${prop.type} | null` : prop.type
                if (prop.decorator) {
                    res.push(`${this.renderPropDecorator(prop.decorator)} ${varName}:${type}`)
                }else{
                    res.push(`${varName}:${type}`)
                }

            })
        }

        return res.join(',')

    }

    private renderObjectPropsType(): string {
        return `{${this.moduleClassMethod.getProps().map((prop) => prop.varName).join(',')}}:{${this.renderDefaultPropsType()}}`

    }

    private renderPropDecorator(decorator: IGmModuleClassMethodPropDecorator): string {
        if (!decorator.getProps().length) {
            return `@${decorator.getDecoratorName()}`
        }

        return `@${decorator.getDecoratorName()}(${decorator.getProps().join(',')})`
    }
}