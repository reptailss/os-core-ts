import { Swagger } from "../core";
export declare class GetSwaggerService {
    private readonly getSwaggerTSService;
    private readonly swaggerPathsBuilder;
    private readonly swaggerConfigBuilder;
    getSwagger(): Promise<Swagger>;
}
