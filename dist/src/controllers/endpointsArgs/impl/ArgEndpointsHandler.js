"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgEndpointsHandler = void 0;
const _controllers_1 = require("../..");
class ArgEndpointsHandler {
    async getDataByControllerMethod(controller, methodName, req, res) {
        const args = await this.getDataByArgs(req, res, controller.args[methodName] || []);
        //@ts-ignore
        return controller[methodName].apply(controller, args);
    }
    async getDataByArgs(req, res, args) {
        const data = [];
        for (const arg of args) {
            const handler = _controllers_1.ArgsResolver[arg.key];
            if (!handler) {
                data.push(null);
                continue;
            }
            const currentData = await handler(req, res, arg);
            data.push(currentData);
        }
        return data;
    }
}
exports.ArgEndpointsHandler = ArgEndpointsHandler;
//# sourceMappingURL=ArgEndpointsHandler.js.map