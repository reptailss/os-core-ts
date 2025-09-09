import { SwaggerConfig } from "../core";
export declare class SwaggerConfigBuilder {
    getOrCreateSwaggerConfig: () => Promise<SwaggerConfig>;
    getConfig: () => Promise<SwaggerConfig | null>;
    getFromBuildFile(): SwaggerConfig;
    saveToBuildFile(config: SwaggerConfig): void;
    writeDefaultConfig: () => SwaggerConfig;
}
