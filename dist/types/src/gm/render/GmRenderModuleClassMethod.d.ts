import { GmRenderModule, IGmModuleClassMethod, IGmRenderModuleClassMethod } from "../core";
export declare class GmRenderModuleClassMethod extends GmRenderModule implements IGmRenderModuleClassMethod {
    private readonly moduleClassMethod;
    constructor(moduleClassMethod: IGmModuleClassMethod);
    renderBody(): string;
    renderReturnType(): string;
    getData<T>(key: string): T;
    renderProps(): string;
    renderAsyncType(): "" | "async ";
    renderScope(): string;
    renderDecorators(): string;
    private renderDefaultPropsType;
    private renderObjectPropsType;
    private renderPropDecorator;
}
