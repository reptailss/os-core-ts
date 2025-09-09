"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemEndpointsHelper = void 0;
class SystemEndpointsHelper {
    static buildSystemEndpointUrl(url) {
        if (!(url === null || url === void 0 ? void 0 : url.length)) {
            return '/inner';
        }
        if (url[0] !== '/') {
            return `/_inner/${url}`;
        }
        return `/_inner${url}`;
    }
}
exports.SystemEndpointsHelper = SystemEndpointsHelper;
//# sourceMappingURL=SystemEndpointsHelper.js.map