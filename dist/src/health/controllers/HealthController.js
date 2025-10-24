"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const _decorators_1 = require("../../decorators");
const core_1 = require("../core");
const _health_1 = require("..");
const _systemRoutes_1 = require("../../systemRoutes");
let HealthController = class HealthController {
    constructor() {
        this.osInfoService = new _health_1.OsInfoService();
        this.readinessService = new core_1.ReadinessService();
    }
    liveness(userDto) {
        return {
            status: 'ok',
            code: 200,
        };
    }
    async osStatus(userDto) {
        return this.osInfoService.getOsInfo();
    }
    async readiness(userDto) {
        return await this.readinessService.getReadiness();
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, _decorators_1.SwaggerInfo)({
        disable: true,
    }),
    (0, _decorators_1.Get)(_systemRoutes_1.SYSTEM_ROUTES.health.liveness),
    __param(0, (0, _decorators_1.DashboardUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], HealthController.prototype, "liveness", null);
__decorate([
    (0, _decorators_1.SwaggerInfo)({
        disable: true,
    }),
    (0, _decorators_1.Get)(_systemRoutes_1.SYSTEM_ROUTES.health.osStatus),
    __param(0, (0, _decorators_1.DashboardUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "osStatus", null);
__decorate([
    (0, _decorators_1.SwaggerInfo)({
        disable: true,
    }),
    (0, _decorators_1.Get)(_systemRoutes_1.SYSTEM_ROUTES.health.readiness),
    __param(0, (0, _decorators_1.DashboardUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "readiness", null);
exports.HealthController = HealthController = __decorate([
    (0, _decorators_1.Controller)()
], HealthController);
//# sourceMappingURL=HealthController.js.map