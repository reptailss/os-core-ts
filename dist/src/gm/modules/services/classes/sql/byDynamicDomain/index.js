"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassGetAllBySqlDynamicDomain = exports.GmModuleServiceClassGetBySqlDynamicDomain = exports.GmModuleServiceClassDeleteBySqlDynamicDomain = exports.GmModuleServiceClassUpdateBySqlDynamicDomain = exports.GmModuleServiceClassCreateBySqlDynamicDomain = exports.GmModuleServiceClassCrudBySqlDynamicDomain = void 0;
const core_1 = require("../../../../../core");
const _helpers_1 = require("../../../../../../helpers");
class GmModuleServiceClassCrudBySqlDynamicDomain extends core_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, allCallVarNames) {
        super(config, `${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.allCallVarNames = allCallVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService);
        this.addAndInitMethod(new core_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.allCallVarNames.create), this.allCallVarNames.create.domain).addAndInitMethod(new core_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.allCallVarNames.update), this.allCallVarNames.update.domain).addAndInitMethod(new core_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.allCallVarNames.delete), this.allCallVarNames.delete.domain).addAndInitMethod(new core_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleModel(), this.allCallVarNames.getById), this.allCallVarNames.getById.domain).addAndInitMethod(new core_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleModel(), this.allCallVarNames.getPagination), this.allCallVarNames.getPagination.domain);
        this.api = new core_1.GmModuleServiceClassApiAll(this.serviceVarName, this.getMethodByIndex(0), this.getMethodByIndex(1), this.getMethodByIndex(2), this.getMethodByIndex(3), this.getMethodByIndex(4));
    }
}
exports.GmModuleServiceClassCrudBySqlDynamicDomain = GmModuleServiceClassCrudBySqlDynamicDomain;
class GmModuleServiceClassCreateBySqlDynamicDomain extends core_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Create${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new core_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.callVarNames), this.callVarNames.domain);
        this.api = new core_1.GmModuleServiceClassApiCreate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassCreateBySqlDynamicDomain = GmModuleServiceClassCreateBySqlDynamicDomain;
class GmModuleServiceClassUpdateBySqlDynamicDomain extends core_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Update${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new core_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.callVarNames), this.callVarNames.domain);
        this.api = new core_1.GmModuleServiceClassApiUpdate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassUpdateBySqlDynamicDomain = GmModuleServiceClassUpdateBySqlDynamicDomain;
class GmModuleServiceClassDeleteBySqlDynamicDomain extends core_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Delete${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new core_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.callVarNames), this.callVarNames.domain);
        this.api = new core_1.GmModuleServiceClassApiDelete(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassDeleteBySqlDynamicDomain = GmModuleServiceClassDeleteBySqlDynamicDomain;
class GmModuleServiceClassGetBySqlDynamicDomain extends core_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Get${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addAndInitMethod(new core_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleModel(), this.callVarNames), this.callVarNames.domain);
        this.api = new core_1.GmModuleServiceClassApiGet(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetBySqlDynamicDomain = GmModuleServiceClassGetBySqlDynamicDomain;
class GmModuleServiceClassGetAllBySqlDynamicDomain extends core_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `GetAll${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addAndInitMethod(new core_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleModel(), this.callVarNames), this.callVarNames.domain);
        this.api = new core_1.GmModuleServiceClassApiGetPagination(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetAllBySqlDynamicDomain = GmModuleServiceClassGetAllBySqlDynamicDomain;
//# sourceMappingURL=index.js.map