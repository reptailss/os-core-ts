export declare class SwaggerHelper {
    static getTSSchemaPaths(): {
        filePath: string;
        dirPath: string;
    };
    static getSwaggerConfigBuildPaths(): {
        filePath: string;
        dirPath: string;
    };
    static getTSResultAndParamsPaths(appDirPath?: string): {
        filePath: string;
        dirPath: string;
    };
    static getSwaggerUrlProps(): {
        url: string;
        host: string;
        schemes: string[];
    };
    static getSwaggerUrl(): string;
    static buildAuthSwagger(): {
        securityDefinitions: {
            BearerAuth: {
                type: string;
                name: string;
                in: string;
                description: string;
            };
        };
        security: {
            BearerAuth: never[];
        }[];
    };
}
