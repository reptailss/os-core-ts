"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsLogsRoutesRegistry = void 0;
const routePaths = [];
class RequestsLogsRoutesRegistry {
    static addFromControllers(controllers) {
        if (!controllers.length) {
            return;
        }
        controllers.forEach((controller) => {
            this.add(controller);
        });
    }
    static add(controller) {
        var _a;
        if (!((_a = controller.endpoints) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        controller.endpoints.forEach(endpoint => {
            routePaths.push(endpoint.path);
        });
    }
    static getRoutePaths() {
        return routePaths;
    }
}
exports.RequestsLogsRoutesRegistry = RequestsLogsRoutesRegistry;
//# sourceMappingURL=RequestsLogsRoutesRegistry.js.map