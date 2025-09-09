import { SwaggerConfigBuilder, SwaggerTSControllersBuilder } from "../core";
export declare class SwaggerTSBuilder {
    private readonly swaggerConfigBuilder;
    private readonly swaggerTSControllersBuilder;
    private swaggerConfig;
    constructor(swaggerConfigBuilder?: SwaggerConfigBuilder, swaggerTSControllersBuilder?: SwaggerTSControllersBuilder);
    buildFromControllers(): Promise<boolean>;
    private buildAndSaveSchema;
    private getFilePaths;
    private normalizeSchema;
    private normalizeParam;
    private saveToFile;
}
