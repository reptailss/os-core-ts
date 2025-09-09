"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassGetAllBySqlStaticDb = exports.GmModuleServiceClassGetBySqlStaticDb = exports.GmModuleServiceClassDeleteBySqlStaticDb = exports.GmModuleServiceClassUpdateBySqlStaticDb = exports.GmModuleServiceClassCreateBySqlStaticDb = exports.GmModuleServiceClassCrudBySqlStaticDb = void 0;
const core_1 = require("../../../../../core");
const _helpers_1 = require("../../../../../../helpers");
class GmModuleServiceClassCrudBySqlStaticDb extends core_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, allCallVarNames) {
        super(config, `${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.allCallVarNames = allCallVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addMethod(new core_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.allCallVarNames.create))
            .addMethod(new core_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.allCallVarNames.update))
            .addMethod(new core_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.allCallVarNames.delete))
            .addMethod(new core_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleModel(), this.allCallVarNames.getById))
            .addMethod(new core_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleModel(), this.allCallVarNames.getPagination));
        this.api = new core_1.GmModuleServiceClassApiAll(this.serviceVarName, this.getMethodByIndex(0), this.getMethodByIndex(1), this.getMethodByIndex(2), this.getMethodByIndex(3), this.getMethodByIndex(4));
    }
}
exports.GmModuleServiceClassCrudBySqlStaticDb = GmModuleServiceClassCrudBySqlStaticDb;
class GmModuleServiceClassCreateBySqlStaticDb extends core_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Create${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addMethod(new core_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.callVarNames));
        this.api = new core_1.GmModuleServiceClassApiCreate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassCreateBySqlStaticDb = GmModuleServiceClassCreateBySqlStaticDb;
class GmModuleServiceClassUpdateBySqlStaticDb extends core_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Update${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addMethod(new core_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.callVarNames));
        this.api = new core_1.GmModuleServiceClassApiUpdate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassUpdateBySqlStaticDb = GmModuleServiceClassUpdateBySqlStaticDb;
class GmModuleServiceClassDeleteBySqlStaticDb extends core_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Delete${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addMethod(new core_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.callVarNames));
        this.api = new core_1.GmModuleServiceClassApiDelete(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassDeleteBySqlStaticDb = GmModuleServiceClassDeleteBySqlStaticDb;
class GmModuleServiceClassGetBySqlStaticDb extends core_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Get${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addMethod(new core_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleModel(), this.callVarNames));
        this.api = new core_1.GmModuleServiceClassApiGet(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetBySqlStaticDb = GmModuleServiceClassGetBySqlStaticDb;
class GmModuleServiceClassGetAllBySqlStaticDb extends core_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `GetAll${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addMethod(new core_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleModel(), this.callVarNames));
        this.api = new core_1.GmModuleServiceClassApiGetPagination(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetAllBySqlStaticDb = GmModuleServiceClassGetAllBySqlStaticDb;
//# sourceMappingURL=index.js.map