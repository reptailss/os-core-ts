import { GmConfig } from "../..";
import { GmBodyElement, GmExport, GmFileWriteMode, GmImport, GmModuleClassMethodProp, GmModuleClassMethodPropDecorator, GmModuleClassVar, GmModuleConstructorProp, GmModuleDirType, GmModuleFnProp, GmModuleParentInfo, GmModulePropsType, IGmModuleClassDecorator, IGmModuleClassMethodDecorator, IGmServiceClass, IGmServiceFn } from "../../core";
export interface IGmModule {
    moduleType: 'constant' | 'class' | 'classMethod' | 'fn' | 'type';
    init(): void;
    getPropertyName(): string;
    getTemplatePath(): string;
    getConfig(): GmConfig;
    getRootModuleDirName(): string;
    addImport(data: GmImport): this;
    getImports(): GmImport[];
    addService(service: IGmServiceFn): this;
    addModule(Module: IGmModule): this;
    getModules(): IGmModule[];
    addChildModule(Module: IGmModule): this;
    getChildModules(): IGmModule[];
    getParentInfo(): GmModuleParentInfo | null;
    setParentInfo(parentInfo: GmModuleParentInfo): this;
}
export interface IGmModuleClass extends IGmModule {
    moduleType: 'class';
    addConstructorProp(constructorProp: GmModuleConstructorProp): this;
    getConstructorProps(): GmModuleConstructorProp[];
    addMethod(method: IGmModuleClassMethod): this;
    getMethods(): IGmModuleClassMethod[];
    getMethodByIndex(index: number): IGmModuleClassMethod;
    addDecorator(decorator: IGmModuleClassDecorator): this;
    getDecorators(): IGmModuleClassDecorator[];
    addService(service: IGmServiceClass | IGmServiceFn): this;
    getDirName(): string | null;
    getFileName(): string;
    setFileWriteMode(mode: GmFileWriteMode): this;
    getFileWriteMode(): GmFileWriteMode;
    setDirType(dirType: GmModuleDirType): this;
    getDirType(): GmModuleDirType;
    getExport(): GmExport | null;
    getFilePath(): string;
    addVar(gmVar: GmModuleClassVar): this;
    getVars(): GmModuleClassVar[];
    addElementBeforeClass(value: string): this;
    getElementsBeforeClass(): string[];
}
export interface IGmModuleClassMethod extends IGmModule {
    moduleType: 'classMethod';
    setReturnType(type: string): this;
    getReturnType(): string;
    appendBodyElement(element: GmBodyElement): this;
    prependBodyElement(element: GmBodyElement): this;
    getBodyElements(): GmBodyElement[];
    addProp(prop: GmModuleClassMethodProp): this;
    getProps(): GmModuleClassMethodProp[];
    setPropsType(type: GmModulePropsType): this;
    getPropsType(): GmModulePropsType;
    addRenderData<T>(key: string, value: T): this;
    getRenderData<T>(key: string): T;
    appendDecorator(decorator: IGmModuleClassMethodDecorator): this;
    prependDecorator(decorator: IGmModuleClassMethodDecorator): this;
    appendPropDecorator(prop: GmModuleClassMethodPropDecorator): this;
    getPropDecorators(): GmModuleClassMethodPropDecorator[];
    getDecorators(): IGmModuleClassMethodDecorator[];
    setMethodScope(scope: 'public' | 'private' | 'static'): this;
    getMethodScope(): 'public' | 'private' | 'static';
    setAsyncType(type: 'sync' | 'async'): this;
    getAsyncType(): 'sync' | 'async';
    renderMethodCall(): string;
}
export interface IGmModuleConstant extends IGmModule {
    moduleType: 'constant';
    setType(type: string): this;
    getType(): string;
    setBody(body: string): this;
    getBody(): string;
    addRenderData<T>(key: string, value: T): this;
    getRenderData<T>(key: string): T;
    getDirName(): string | null;
    getFileName(): string;
    setFileWriteMode(mode: GmFileWriteMode): this;
    getFileWriteMode(): GmFileWriteMode;
    setDirType(dirType: GmModuleDirType): this;
    getDirType(): GmModuleDirType;
    getExport(): GmExport | null;
    getFilePath(): string;
}
export interface IGmModuleFn extends IGmModule {
    moduleType: 'fn';
    setReturnType(type: string): this;
    getReturnType(): string;
    setType(type: string): this;
    getType(): string;
    appendBodyElement(element: GmBodyElement): this;
    prependBodyElement(element: GmBodyElement): this;
    getBodyElements(): GmBodyElement[];
    addProp(prop: GmModuleFnProp): this;
    getProps(): GmModuleFnProp[];
    setPropsType(type: GmModulePropsType): this;
    getPropsType(): GmModulePropsType;
    addRenderData<T>(key: string, value: T): this;
    getRenderData<T>(key: string): T;
    setAsyncType(type: 'sync' | 'async'): this;
    getAsyncType(): 'sync' | 'async';
    getDirName(): string | null;
    getFileName(): string;
    setFileWriteMode(mode: GmFileWriteMode): this;
    getFileWriteMode(): GmFileWriteMode;
    setDirType(dirType: GmModuleDirType): this;
    getDirType(): GmModuleDirType;
    getExport(): GmExport | null;
    getFilePath(): string;
}
export interface IGmModuleType extends IGmModule {
    moduleType: 'type';
    setBody(body: string): this;
    getBody(): string;
    addRenderData<T>(key: string, value: T): this;
    getRenderData<T>(key: string): T;
    getDirName(): string | null;
    getFileName(): string;
    setFileWriteMode(mode: GmFileWriteMode): this;
    getFileWriteMode(): GmFileWriteMode;
    setDirType(dirType: GmModuleDirType): this;
    getDirType(): GmModuleDirType;
    getExport(): GmExport | null;
    getFilePath(): string;
}
