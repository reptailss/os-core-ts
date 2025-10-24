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
exports.GetConsoleLogsController = void 0;
const _decorators_1 = require("../../../decorators");
const core_1 = require("../../core");
const _systemRoutes_1 = require("../../../systemRoutes");
const _validator_1 = require("../../../validator");
const dateSchema = _validator_1.Validator.date();
let GetConsoleLogsController = class GetConsoleLogsController {
    constructor() {
        this.getConsoleLogsService = new core_1.GetConsoleLogsService();
    }
    getLogs(dateStart, dateEnd, userDto) {
        return this.getConsoleLogsService.getLogs({
            dateStart,
            dateEnd,
        });
    }
};
exports.GetConsoleLogsController = GetConsoleLogsController;
__decorate([
    (0, _decorators_1.SwaggerInfo)({
        disable: true,
    }),
    (0, _decorators_1.Get)(_systemRoutes_1.SYSTEM_ROUTES.osLogs.index),
    __param(0, (0, _decorators_1.QueryParam)('date_start', dateSchema)),
    __param(1, (0, _decorators_1.QueryParam)('date_end', dateSchema)),
    __param(2, (0, _decorators_1.DashboardUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date, Object]),
    __metadata("design:returntype", Promise)
], GetConsoleLogsController.prototype, "getLogs", null);
exports.GetConsoleLogsController = GetConsoleLogsController = __decorate([
    (0, _decorators_1.Controller)()
], GetConsoleLogsController);
//# sourceMappingURL=GetConsoleLogsController.js.map