"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerTSHelper = void 0;
class SwaggerTSHelper {
    static getParamsKeyBuildTsSchema({ method, className }) {
        return `_param_${method}_${className}`;
    }
    static getResponseKeyBuildTsSchema({ method, className }) {
        return `_response_${method}_${className}`;
    }
    static checkIsParamKey(value) {
        const paramKeyPattern = /^_param_\w+_\w+$/;
        return paramKeyPattern.test(value);
    }
}
exports.SwaggerTSHelper = SwaggerTSHelper;
//# sourceMappingURL=SwaggerTSHelper.js.map