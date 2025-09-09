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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerController = void 0;
const _decorators_1 = require("../../decorators");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const _clientPackages_1 = require("../../clientPackages");
const _systemRoutes_1 = require("../../systemRoutes");
const core_1 = require("../core");
let SwaggerController = class SwaggerController {
    constructor(getSwaggerService = new core_1.GetSwaggerService()) {
        this.getSwaggerService = getSwaggerService;
    }
    async getSwagger() {
        return this.getSwaggerService.getSwagger();
    }
    getClientBundle() {
        return this.getFilePath('main.js');
    }
    getClientFavicon() {
        return this.getFilePath('favicon.ico');
    }
    async getClientHtml() {
        const html = await promises_1.default.readFile(this.getFilePath('index.html'), {
            encoding: 'utf-8',
        });
        const clientPackagesHtmlBuilder = new _clientPackages_1.ClientPackagesHtmlBuilder({
            html,
            packageName: 'swagger',
        });
        return clientPackagesHtmlBuilder
            .addServicePrefixToScriptsBundle()
            .addServicePrefixToWindow()
            .addServiceNameToTitle()
            .getHtml();
    }
    getFilePath(fileName) {
        return path_1.default.resolve(__dirname, '../', '../', '../', 'static', 'swagger', fileName);
    }
};
exports.SwaggerController = SwaggerController;
__decorate([
    (0, _decorators_1.SwaggerInfoDec)({
        disable: true,
    }),
    (0, _decorators_1.GetDec)(_systemRoutes_1.SYSTEM_ROUTES.swagger.swaggerSpec),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SwaggerController.prototype, "getSwagger", null);
__decorate([
    (0, _decorators_1.SwaggerInfoDec)({
        disable: true,
    }),
    (0, _decorators_1.SendFileByPathDec)(_systemRoutes_1.SYSTEM_ROUTES.swagger.bundleJs),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], SwaggerController.prototype, "getClientBundle", null);
__decorate([
    (0, _decorators_1.SwaggerInfoDec)({
        disable: true,
    }),
    (0, _decorators_1.SendFileByPathDec)(_systemRoutes_1.SYSTEM_ROUTES.swagger.favicon),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], SwaggerController.prototype, "getClientFavicon", null);
__decorate([
    (0, _decorators_1.SwaggerInfoDec)({
        disable: true,
    }),
    (0, _decorators_1.SendFileDec)(_systemRoutes_1.SYSTEM_ROUTES.swagger.index),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SwaggerController.prototype, "getClientHtml", null);
exports.SwaggerController = SwaggerController = __decorate([
    (0, _decorators_1.ControllerDec)(),
    __metadata("design:paramtypes", [core_1.GetSwaggerService])
], SwaggerController);
//# sourceMappingURL=SwaggerController.js.map