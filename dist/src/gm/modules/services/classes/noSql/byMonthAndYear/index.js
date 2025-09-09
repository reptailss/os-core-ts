"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassGetAllByNoSqlMonthAndYear = exports.GmModuleServiceClassCreateByNoSqlMonthAndYear = exports.GmModuleServiceClassCrudByNoSqlMonthAndYear = void 0;
const core_1 = require("../../../../../core");
const _helpers_1 = require("../../../../../../helpers");
class GmModuleServiceClassCrudByNoSqlMonthAndYear extends core_1.GmModuleServiceClassByNoSqlMonthAndYear {
    constructor(config, serviceVarName, allCallVarNames) {
        super(config, `${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.allCallVarNames = allCallVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService);
        this.addAndInitMethod(new core_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.allCallVarNames.create), this.allCallVarNames.create.month, this.allCallVarNames.create.year);
        this.addMethod(new core_1.GmModuleServiceMethodGetPaginationNoSql(this.getConfig(), this.getModuleModel(), this.allCallVarNames.getPagination));
        this.api = new core_1.GmModuleServiceClassApiAll(this.serviceVarName, this.getMethodByIndex(0), this.getMethodByIndex(1), this.getMethodByIndex(1), this.getMethodByIndex(1), this.getMethodByIndex(1));
    }
}
exports.GmModuleServiceClassCrudByNoSqlMonthAndYear = GmModuleServiceClassCrudByNoSqlMonthAndYear;
class GmModuleServiceClassCreateByNoSqlMonthAndYear extends core_1.GmModuleServiceClassByNoSqlMonthAndYear {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Create${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new core_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new core_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleModel(), this.actionsLoggerService, this.callVarNames), this.callVarNames.month, this.callVarNames.year);
        this.api = new core_1.GmModuleServiceClassApiCreate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassCreateByNoSqlMonthAndYear = GmModuleServiceClassCreateByNoSqlMonthAndYear;
class GmModuleServiceClassGetAllByNoSqlMonthAndYear extends core_1.GmModuleServiceClassByNoSqlMonthAndYear {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `GetAll${_helpers_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addMethod(new core_1.GmModuleServiceMethodGetPaginationNoSql(this.getConfig(), this.getModuleModel(), this.callVarNames));
        this.api = new core_1.GmModuleServiceClassApiGetPagination(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetAllByNoSqlMonthAndYear = GmModuleServiceClassGetAllByNoSqlMonthAndYear;
//# sourceMappingURL=index.js.map