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
exports.GetRequestsLogsController = void 0;
const _decorators_1 = require("../../../decorators");
const _systemRoutes_1 = require("../../../systemRoutes");
const core_1 = require("../../core");
const _logger_1 = require("../..");
let GetRequestsLogsController = class GetRequestsLogsController {
    constructor() {
        this.getRequestsLogsService = new core_1.GetRequestsLogsService();
    }
    async getLogs(userDto) {
        const rows = await this.getRequestsLogsService.getRequestsLogs();
        return {
            rows,
            paths: _logger_1.RequestsLogsRoutesRegistry.getRoutePaths(),
        };
    }
};
exports.GetRequestsLogsController = GetRequestsLogsController;
__decorate([
    (0, _decorators_1.SwaggerInfo)({
        disable: true,
    }),
    (0, _decorators_1.Get)(_systemRoutes_1.SYSTEM_ROUTES.osRequestsInfo.index),
    __param(0, (0, _decorators_1.DashboardUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetRequestsLogsController.prototype, "getLogs", null);
exports.GetRequestsLogsController = GetRequestsLogsController = __decorate([
    (0, _decorators_1.Controller)()
], GetRequestsLogsController);
//# sourceMappingURL=GetRequestsLogsController.js.map