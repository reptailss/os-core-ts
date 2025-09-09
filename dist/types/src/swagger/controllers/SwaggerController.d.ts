import { GetSwaggerService, Swagger } from "../core";
export declare class SwaggerController {
    private readonly getSwaggerService;
    constructor(getSwaggerService?: GetSwaggerService);
    getSwagger(): Promise<Swagger>;
    getClientBundle(): string;
    getClientFavicon(): string;
    getClientHtml(): Promise<string>;
    private getFilePath;
}
