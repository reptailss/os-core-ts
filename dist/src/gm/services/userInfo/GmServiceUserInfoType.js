"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceUserInfoType = void 0;
const core_1 = require("../../core");
class GmServiceUserInfoType extends core_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'UserInfo',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'UserInfo';
    }
    getUserInfoType() {
        return `UserInfo`;
    }
}
exports.GmServiceUserInfoType = GmServiceUserInfoType;
//# sourceMappingURL=GmServiceUserInfoType.js.map