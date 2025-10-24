"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const qs_1 = __importDefault(require("qs"));
const _appConfig_1 = require("../../appConfig");
const _routerBuilder_1 = require("../../routerBuilder");
const _logger_1 = require("../../logger");
const _health_1 = require("../../health");
const _dashboard_1 = require("../../dashboard");
const _swagger_1 = require("../../swagger");
const _controllers_1 = require("../../controllers");
const _di_1 = require("../../di");
const _structureServiceEndpoints_1 = require("../../structureServiceEndpoints");
class App {
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.routerBuilder = new _routerBuilder_1.RouterBuilder();
        this.appPlugins = [];
        this.appModules = [];
        this.modulesConfig = {
            cors: false,
            health: false,
            dashboard: false,
            swagger: false,
            requestLogger: false,
            consoleLogger: false,
            static: {},
            importStructureServiceEndpoints: {
                active: false,
                type: 'plugin',
            },
            enableSystemModulesFromEnv: false,
        };
        this.notFoundAppRouterRequestHandler = null;
        this.serviceEndpoints = [];
        this.importStructureServiceEndpoints = [];
    }
    listen(port, callback) {
        const currentPort = port || _appConfig_1.APP_CONFIG_OS_CORE.servicePort;
        return this.expressApp.listen(currentPort, callback ? callback : () => {
            _logger_1.appLogger.info('Service has been started on port:' + currentPort);
        });
    }
    useModule(appModule) {
        this.appModules.push(appModule);
        return this;
    }
    useStatic(dirPath) {
        this.modulesConfig.static[dirPath] = {
            active: true,
        };
        return this;
    }
    useCors() {
        this.modulesConfig.cors = true;
        return this;
    }
    useHealth() {
        this.modulesConfig.health = true;
        return this;
    }
    useDashboard() {
        this.modulesConfig.dashboard = true;
        return this;
    }
    useSwagger() {
        this.modulesConfig.swagger = true;
        return this;
    }
    useRequestLogger() {
        this.modulesConfig.requestLogger = true;
        return this;
    }
    useConsoleLogger() {
        this.modulesConfig.consoleLogger = true;
        return this;
    }
    useImportStructureServiceEndpoints(type) {
        this.modulesConfig.importStructureServiceEndpoints = {
            type,
            active: true,
        };
        return this;
    }
    usePlugin(plugin) {
        this.appPlugins.push(plugin);
        return this;
    }
    enableSystemModulesFromEnv() {
        this.modulesConfig.enableSystemModulesFromEnv = true;
        return this;
    }
    initModules() {
        if (this.appPlugins.length) {
            this.appPlugins.forEach(plugin => {
                plugin.register(this);
            });
        }
        this.expressApp.set('query parser', function (str) {
            return qs_1.default.parse(str, { arrayLimit: 1000 });
        });
        this.expressApp.use((0, express_1.json)({
            limit: '5mb',
        }));
        this.expressApp.use((0, express_1.urlencoded)({ extended: true }));
        if (this.modulesConfig.enableSystemModulesFromEnv ? _appConfig_1.APP_CONFIG_OS_CORE.hasCors : this.modulesConfig.cors) {
            this.expressApp.use((0, cors_1.default)({ origin: true, credentials: true }));
        }
        if (this.modulesConfig.health) {
            this.initSystemAppModule(_health_1.healthAppModule);
        }
        if (this.modulesConfig.dashboard) {
            this.initSystemAppModule(_dashboard_1.dashboardAppModule);
        }
        if (this.modulesConfig.enableSystemModulesFromEnv ? _appConfig_1.APP_CONFIG_OS_CORE.swagger.hasSwagger : this.modulesConfig.swagger) {
            this.initSystemAppModule(_swagger_1.swaggerAppModule);
        }
        if (this.modulesConfig.consoleLogger) {
            (0, _logger_1._initAppLogger)();
            this.initSystemAppModule(_logger_1.consoleLoggerAppModule);
        }
        if (this.modulesConfig.requestLogger) {
            this.expressApp.use(new _logger_1.RequestsLoggerInitializer().buildMiddleware());
            this.initSystemAppModule(_logger_1.requestLoggerAppModule);
            this.initSystemAppModule(_logger_1.osStatusLoggerAppModule);
            _logger_1.SaveOsStatusServicesRegistryService.saveServicesRegistry({
                serviceKey: _appConfig_1.APP_CONFIG_OS_CORE.serviceKey,
                endpoints: this.serviceEndpoints,
            }).then(() => {
                _logger_1.appLogger.info('Success save api key to os-status api');
            }).catch(() => {
                _logger_1.appLogger.error('Error save api key to os-status api');
            });
            _logger_1.SaveActionSystemServicesRegistryService.saveServicesRegistry({
                serviceKey: _appConfig_1.APP_CONFIG_OS_CORE.serviceKey,
            }).then(() => {
                _logger_1.appLogger.info('Success save api key to actions logger api');
            }).catch(() => {
                _logger_1.appLogger.error('Error save api key to actions logger api');
            });
            new _logger_1.OsStatusLogsCron().start();
        }
        for (const appModule of this.appModules) {
            this.initAppModule(appModule);
        }
        if (this.modulesConfig.importStructureServiceEndpoints.active) {
            _structureServiceEndpoints_1.ImportStructureServicesService.importServices({
                service_key: _appConfig_1.APP_CONFIG_OS_CORE.serviceKey,
                endpoints: this.importStructureServiceEndpoints,
                type: this.modulesConfig.importStructureServiceEndpoints.type,
            }).then(() => {
                _logger_1.appLogger.info('Success import api endpoints');
            }).catch((error) => {
                _logger_1.appLogger.error('Error save api endpoints', error);
            });
        }
        this.initStatics();
        if (this.notFoundAppRouterRequestHandler) {
            this.expressApp.use(this.notFoundAppRouterRequestHandler);
        }
        return this;
    }
    use(...props) {
        return this.expressApp.use(...props);
    }
    useMiddleware(middleware) {
        this.expressApp.use(middleware);
        return this;
    }
    set(key, value) {
        this.expressApp.set(key, value);
    }
    useLocales({}) {
        return this;
    }
    useNotFoundRoute(appRouterRequestHandler) {
        this.notFoundAppRouterRequestHandler = appRouterRequestHandler;
        return this;
    }
    overrideProvider(target, options = {}) {
        _di_1.DiContainer.register(target, options);
        return this;
    }
    initStatics() {
        for (const dirPath in this.modulesConfig.static) {
            this.expressApp.use(express_1.default.static(dirPath));
        }
    }
    initAppModule(appModule) {
        var _a;
        if (appModule.controllers.length) {
            const controllers = [];
            appModule.controllers.forEach((Controller) => {
                const instance = _di_1.DiContainer.resolve(Controller, appModule.getProviders());
                controllers.push(instance);
                if (instance.endpoints.length) {
                    instance.endpoints.forEach(endpoint => {
                        this.serviceEndpoints.push(_controllers_1.ControllersHelper.buildEndpointUrl({
                            endpointPath: endpoint.path,
                            isSystemEndpoint: endpoint.type === 'system',
                        }));
                        if (this.modulesConfig.importStructureServiceEndpoints.active) {
                            if (!instance.importStructureServiceEndpoints ||
                                !(endpoint._propertyKey in instance.importStructureServiceEndpoints)) {
                                return;
                            }
                            const data = instance.importStructureServiceEndpoints[endpoint._propertyKey];
                            this.importStructureServiceEndpoints.push({
                                name: (data === null || data === void 0 ? void 0 : data.name) || '',
                                key: (data === null || data === void 0 ? void 0 : data.key) || endpoint.path,
                            });
                        }
                    });
                }
            });
            this.expressApp.use(this.routerBuilder.buildRoute(controllers));
            if (this.modulesConfig.swagger) {
                _swagger_1.ControllerSwaggerInfoRegistry.addFromControllers({
                    controllers: controllers,
                    baseSwaggerTag: (_a = appModule.swaggerInfo) === null || _a === void 0 ? void 0 : _a.tag,
                });
            }
            if (this.modulesConfig.requestLogger) {
                _logger_1.RequestsLogsRoutesRegistry.addFromControllers(controllers);
            }
        }
    }
    initSystemAppModule(appModule) {
        const controllers = appModule.controllers.map((Controller) => {
            return _di_1.DiContainer.resolve(Controller, appModule.getProviders());
        });
        this.expressApp.use(this.routerBuilder.buildRoute(controllers));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map