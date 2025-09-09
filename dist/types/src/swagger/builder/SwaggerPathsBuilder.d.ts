import { PathsSwagger, SwaggerTsSchemas } from "../core";
export declare class SwaggerPathsBuilder {
    getPathsByTSSchemas(tsSchema: SwaggerTsSchemas): PathsSwagger;
    private convertPathParams;
    private getParamsSwaggerByControllers;
    private getResponsesSwaggerByControllers;
    private buildMethodResponsesSwagger;
    private buildSwaggerResponsesByErrorKeys;
    private getResponsesSwaggerMessageFromResponseDescription;
    private buildResponseErrorDescription;
    private getBaseErrorCodesSwagger;
    private buildConsumesSwagger;
    private buildSecuritySwagger;
    private buildSecurityTsBuildSchema;
    private getParamsByArgSwaggerByControllers;
    private transformQueryParamsSwagger;
    private getKeyParam;
    private getParams;
    private getRefPathSwagger;
    private getRefPathKeySwagger;
    private getRefFromPathSwagger;
    private getParamsByTsSchema;
    private getOptionsFormArgsTsBuildSchema;
}
