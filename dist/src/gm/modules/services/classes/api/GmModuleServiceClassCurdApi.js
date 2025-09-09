"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassApiGetPagination = exports.GmModuleServiceClassApiGet = exports.GmModuleServiceClassApiDelete = exports.GmModuleServiceClassApiUpdate = exports.GmModuleServiceClassApiCreate = exports.GmModuleServiceClassApiAll = void 0;
class GmModuleServiceClassApiAll {
    constructor(serviceVarName, createMethod, updateMethod, deleteMethod, getByIdMethod, getAllMethod) {
        this.serviceVarName = serviceVarName;
        this.createMethod = createMethod;
        this.updateMethod = updateMethod;
        this.deleteMethod = deleteMethod;
        this.getByIdMethod = getByIdMethod;
        this.getAllMethod = getAllMethod;
        this.serviceVarName = serviceVarName;
    }
    create() {
        return `${this.serviceVarName}.${this.createMethod.renderMethodCall()}`;
    }
    update() {
        return `${this.serviceVarName}.${this.updateMethod.renderMethodCall()}`;
    }
    delete() {
        return `${this.serviceVarName}.${this.deleteMethod.renderMethodCall()}`;
    }
    getById() {
        return `${this.serviceVarName}.${this.getByIdMethod.renderMethodCall()}`;
    }
    getPagination() {
        return `${this.serviceVarName}.${this.getAllMethod.renderMethodCall()}`;
    }
}
exports.GmModuleServiceClassApiAll = GmModuleServiceClassApiAll;
class GmModuleServiceClassApiCreate {
    constructor(serviceVarName, method) {
        this.serviceVarName = serviceVarName;
        this.method = method;
        this.serviceVarName = serviceVarName;
    }
    create() {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`;
    }
}
exports.GmModuleServiceClassApiCreate = GmModuleServiceClassApiCreate;
class GmModuleServiceClassApiUpdate {
    constructor(serviceVarName, method) {
        this.serviceVarName = serviceVarName;
        this.method = method;
        this.serviceVarName = serviceVarName;
    }
    update() {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`;
    }
}
exports.GmModuleServiceClassApiUpdate = GmModuleServiceClassApiUpdate;
class GmModuleServiceClassApiDelete {
    constructor(serviceVarName, method) {
        this.serviceVarName = serviceVarName;
        this.method = method;
        this.serviceVarName = serviceVarName;
    }
    delete() {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`;
    }
}
exports.GmModuleServiceClassApiDelete = GmModuleServiceClassApiDelete;
class GmModuleServiceClassApiGet {
    constructor(serviceVarName, method) {
        this.serviceVarName = serviceVarName;
        this.method = method;
        this.serviceVarName = serviceVarName;
    }
    getById() {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`;
    }
}
exports.GmModuleServiceClassApiGet = GmModuleServiceClassApiGet;
class GmModuleServiceClassApiGetPagination {
    constructor(serviceVarName, method) {
        this.serviceVarName = serviceVarName;
        this.method = method;
        this.serviceVarName = serviceVarName;
    }
    getPagination() {
        return `${this.serviceVarName}.${this.method.renderMethodCall()}`;
    }
}
exports.GmModuleServiceClassApiGetPagination = GmModuleServiceClassApiGetPagination;
//# sourceMappingURL=GmModuleServiceClassCurdApi.js.map