export declare class SwaggerTSHelper {
    static getParamsKeyBuildTsSchema({ method, className }: {
        method: string;
        className: string;
    }): string;
    static getResponseKeyBuildTsSchema({ method, className }: {
        method: string;
        className: string;
    }): string;
    static checkIsParamKey(value: string): boolean;
}
