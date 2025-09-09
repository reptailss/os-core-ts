export declare class SwaggerTSControllersBuilder {
    buildAndSaveToFile(appDirPath?: string): void;
    deleteFromFile(appDirPath?: string): void;
    private getResponseAndParams;
    private getFilePaths;
    private extractControllersBuildTsSchema;
    private isDecoratorNamed;
    private generateFileByMethods;
    private saveResponseAndParamsToFile;
}
