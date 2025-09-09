"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterBuilder = void 0;
const express_1 = require("express");
const _appError_1 = require("../../appError");
const DefaultRouteRegistrars_1 = require("./DefaultRouteRegistrars");
class RouterBuilder {
    constructor() {
        this.defaultRouteRegistrars = new DefaultRouteRegistrars_1.DefaultRouteRegistrars();
        this.routeRegistrars = new Map();
        this.registerRouteHandler('GET', this.defaultRouteRegistrars.getGetHandler());
        this.registerRouteHandler('POST', this.defaultRouteRegistrars.getPostHandler());
        this.registerRouteHandler('PUT', this.defaultRouteRegistrars.getPutHandler());
        this.registerRouteHandler('DELETE', this.defaultRouteRegistrars.getDeleteHandler());
    }
    buildRoute(controllers) {
        const router = (0, express_1.Router)();
        controllers.forEach(controller => {
            var _a;
            if (!((_a = controller === null || controller === void 0 ? void 0 : controller.endpoints) === null || _a === void 0 ? void 0 : _a.length)) {
                return;
            }
            for (const endpoint of controller.endpoints) {
                const registrar = this.routeRegistrars.get(endpoint.method);
                if (!registrar) {
                    throw new _appError_1.AppError(`No registrar found for method "${endpoint.method}"`);
                }
                registrar(router, endpoint, controller);
            }
        });
        return router;
    }
    registerRouteHandler(method, registrar) {
        this.routeRegistrars.set(method, registrar);
    }
}
exports.RouterBuilder = RouterBuilder;
//# sourceMappingURL=RouterBuilder.js.map