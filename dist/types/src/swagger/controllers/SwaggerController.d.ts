import { Swagger } from "../core";
export declare class SwaggerController {
    private readonly getSwaggerService;
    getSwagger(): Promise<Swagger>;
    getClientBundle(): string;
    getClientFavicon(): string;
    getClientHtml(): Promise<string>;
    private getFilePath;
}
