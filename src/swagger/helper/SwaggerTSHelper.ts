export class SwaggerTSHelper {

    static getParamsKeyBuildTsSchema({method, className}: {
        method: string,
        className: string
    }) {
        return `_param_${method}_${className}`
    }

    static getResponseKeyBuildTsSchema({method, className}: {
        method: string,
        className: string
    }) {
        return `_response_${method}_${className}`
    }

    static checkIsParamKey(value: string): boolean {
        const paramKeyPattern = /^_param_\w+_\w+$/
        return paramKeyPattern.test(value)
    }
}