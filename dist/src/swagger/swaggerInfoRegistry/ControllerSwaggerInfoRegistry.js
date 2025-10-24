"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerSwaggerInfoRegistry = void 0;
const _controllers_1 = require("../../controllers");
const swaggerInfo = [];
class ControllerSwaggerInfoRegistry {
    static addFromControllers({ controllers, baseSwaggerTag, }) {
        controllers.forEach(controller => {
            this.add({
                controller,
                baseSwaggerTag,
            });
        });
    }
    static add({ controller, baseSwaggerTag, }) {
        var _a;
        if (!((_a = controller.endpoints) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        const methods = [];
        controller.endpoints.forEach((endpoint) => {
            var _a, _b;
            const method = endpoint.method.toLowerCase();
            if (method !== 'get' &&
                method !== 'post' &&
                method !== 'put' &&
                method !== 'delete') {
                return;
            }
            methods.push({
                method: method,
                methodName: endpoint._propertyKey,
                path: _controllers_1.ControllersHelper.buildEndpointUrl({
                    endpointPath: endpoint.path,
                    isSystemEndpoint: endpoint.type === 'system',
                }),
                args: controller.args[endpoint._propertyKey] || [],
                swaggerOptions: Object.assign(Object.assign({}, ((controller === null || controller === void 0 ? void 0 : controller.swaggerOptions) || {})), { tag: baseSwaggerTag || ((_a = controller === null || controller === void 0 ? void 0 : controller.swaggerOptions) === null || _a === void 0 ? void 0 : _a.tag) }),
                baseInfo: Object.assign({ tag: baseSwaggerTag || ((_b = controller.swaggerInfo[endpoint._propertyKey]) === null || _b === void 0 ? void 0 : _b.tag) }, (controller.swaggerInfo[endpoint._propertyKey] || {})),
                isSystemController: endpoint.type === 'system',
            });
        });
        swaggerInfo.push({
            methods,
            className: controller.constructor.name,
        });
    }
    static getSwaggerInfoList() {
        return swaggerInfo;
    }
}
exports.ControllerSwaggerInfoRegistry = ControllerSwaggerInfoRegistry;
//# sourceMappingURL=ControllerSwaggerInfoRegistry.js.map