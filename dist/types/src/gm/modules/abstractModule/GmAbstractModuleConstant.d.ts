import { GmAbstractModule, GmExport, GmFileWriteMode, GmModuleDirType, IGmModuleClass, IGmModuleConstant, IGmModuleFn, IGmModuleType } from "../../core";
export declare abstract class GmAbstractModuleConstant extends GmAbstractModule implements IGmModuleConstant {
    moduleType: "constant";
    private renderData;
    private type;
    private body;
    private fileWriteModeGm;
    private dirType;
    abstract getDirName(): string | null;
    abstract getFileName(): string;
    getTemplatePath(): string;
    setType(type: string): this;
    getType(): string;
    setBody(body: string): this;
    getBody(): string;
    addRenderData<T>(key: string, value: T): this;
    getRenderData<T>(key: string): T;
    getExport(): GmExport;
    getFileWriteMode(): GmFileWriteMode;
    setDirType(dirType: GmModuleDirType): this;
    getDirType(): GmModuleDirType;
    setFileWriteMode(mode: GmFileWriteMode): this;
    getFilePath(): string;
    addChildModule(module: IGmModuleFn | IGmModuleConstant | IGmModuleType | IGmModuleClass): this;
}
