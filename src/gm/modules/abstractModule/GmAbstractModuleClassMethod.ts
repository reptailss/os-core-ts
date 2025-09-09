import {
    GmAbstractModule,
    GmBodyElement,
    GmModuleClassMethodProp,
    GmModuleClassMethodPropDecorator,
    GmModulePropsType,
    IGmModuleClassMethod,
    IGmModuleClassMethodDecorator,
} from '@gm/core'
import {AppError} from '@appError'


export abstract class GmAbstractModuleClassMethod extends GmAbstractModule implements IGmModuleClassMethod {

    public moduleType = 'classMethod' as const

    private returnType: string = ''
    private bodyElements: GmBodyElement[] = []
    private decorators: IGmModuleClassMethodDecorator[] = []
    private propDecorators: GmModuleClassMethodPropDecorator[] = []
    private props: GmModuleClassMethodProp[] = []
    private propsType: GmModulePropsType = 'default'
    private renderData: Record<string, unknown> = {}
    private asyncType: 'sync' | 'async' = 'sync'
    private scope: 'public' | 'private' | 'static' = 'public'

    public getTemplatePath(): string {
        return 'modules/classMethod.ejs'
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

    public getBodyElements(): GmBodyElement[] {
        return this.bodyElements
    }

    public prependBodyElement(bodyElement: GmBodyElement): this {
        this.bodyElements.unshift(bodyElement)
        return this
    }

    public addProp(prop: GmModuleClassMethodProp): this {
        this.props.push(prop)
        if (prop.decorator) {
            this.addImport(prop.decorator.getImport())
        }
        return this
    }

    public appendPropDecorator(propDecorator: GmModuleClassMethodPropDecorator): this {
        this.addImport(propDecorator.decorator.getImport())
        this.propDecorators.push(propDecorator)
        return this
    }

    public getPropDecorators():GmModuleClassMethodPropDecorator[] {
        return this.propDecorators
    }

    public getProps(): GmModuleClassMethodProp[] {
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

    public appendDecorator(decorator: IGmModuleClassMethodDecorator, prepend: boolean = false): this {
        this.decorators.push(decorator)
        this.addImport(decorator.getImport())
        return this
    }

    public prependDecorator(decorator: IGmModuleClassMethodDecorator, prepend: boolean = false): this {
        this.decorators.unshift(decorator)
        this.addImport(decorator.getImport())
        return this
    }


    public getDecorators(): IGmModuleClassMethodDecorator[] {
        return this.decorators
    }

    public setMethodScope(scope: 'public' | 'private' | 'static'): this {
        this.scope = scope
        return this
    }

    public getMethodScope(): 'public' | 'private' | 'static' {
        return this.scope
    }

    public setAsyncType(type: 'sync' | 'async'): this {
        this.asyncType = type
        return this
    }

    public getAsyncType() {
        return this.asyncType
    }

    public renderMethodCall(): string {
        return `${this.getPropertyName()}(${this.renderMethodCallProps()})`
    }

    private renderMethodCallProps(): string {
        if (!this.getProps().length) {
            return ''
        }
        switch (this.getPropsType()) {
            case 'default':
                return this.renderDefaultCallPropsType()
            case 'object':
                return this.renderObjectCallPropsType()
        }
    }

    private renderDefaultCallPropsType(): string {
        return this.getProps().map((prop) => {
            return prop.callVarName
        })?.join(',')
    }

    private renderObjectCallPropsType(): string {
        return `{${this.getProps().map((prop) => {
            if (prop.callVarName === prop.varName) {
                return prop.callVarName
            }
            return `${prop.varName}:${prop.callVarName}`
        }).join(',')}}`
    }
}
