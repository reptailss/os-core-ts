export declare class SwaggerTSBuilder {
    private swaggerConfig;
    private readonly swaggerConfigBuilder;
    private readonly swaggerTSControllersBuilder;
    buildFromControllers(): Promise<boolean>;
    private buildAndSaveSchema;
    private getFilePaths;
    private normalizeSchema;
    private normalizeParam;
    private saveToFile;
}
