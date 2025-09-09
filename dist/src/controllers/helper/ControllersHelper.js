"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllersHelper = void 0;
const _helpers_1 = require("../../helpers");
class ControllersHelper {
    static buildEndpointUrl({ endpointPath, isSystemEndpoint, }) {
        if (!isSystemEndpoint) {
            return endpointPath;
        }
        return _helpers_1.SystemEndpointsHelper.buildSystemEndpointUrl(endpointPath);
    }
}
exports.ControllersHelper = ControllersHelper;
//# sourceMappingURL=ControllersHelper.js.map