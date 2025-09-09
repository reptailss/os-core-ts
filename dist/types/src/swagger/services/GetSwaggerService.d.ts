import { GetSwaggerTSService, Swagger, SwaggerConfigBuilder, SwaggerPathsBuilder } from "../core";
export declare class GetSwaggerService {
    private readonly getSwaggerTSService;
    private readonly swaggerPathsBuilder;
    private readonly swaggerConfigBuilder;
    constructor(getSwaggerTSService?: GetSwaggerTSService, swaggerPathsBuilder?: SwaggerPathsBuilder, swaggerConfigBuilder?: SwaggerConfigBuilder);
    getSwagger(): Promise<Swagger>;
}
