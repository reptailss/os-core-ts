"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceThrowAppError = void 0;
const core_1 = require("../../core");
class GmServiceThrowAppError extends core_1.GmAbstractServiceFn {
    getServiceName() {
        return 'AppError';
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'AppError',
            isLibImport: true,
        };
    }
    throwAppError({ message, errorKey, ifConstruction, }) {
        if (ifConstruction) {
            return `if(${ifConstruction}){
                        throw new AppError('${message}',\n{ \nerrorKey:'${errorKey}'})
                    }`;
        }
        return `throw new AppError('${message}',\n{ errorKey:'${errorKey}'})`;
    }
}
exports.GmServiceThrowAppError = GmServiceThrowAppError;
//# sourceMappingURL=GmServiceThrowAppError.js.map