"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFilesDec = exports.DeleteOldFileIfNullDec = exports.AppFileDec = void 0;
const core_1 = require("../core");
const AppFileDec = ({ fileKey, formats, required, } = {}) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'AppFile',
                fileKey,
                formats,
                required,
            },
        });
    };
};
exports.AppFileDec = AppFileDec;
const DeleteOldFileIfNullDec = ({ fileKey, } = {}) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'DeleteOldFileIfNull',
                fileKey,
            },
        });
    };
};
exports.DeleteOldFileIfNullDec = DeleteOldFileIfNullDec;
const AppFilesDec = ({ formats, maxCount, minCount, fileKey, }) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'AppFiles',
                formats,
                maxCount,
                minCount,
                fileKey,
            },
        });
    };
};
exports.AppFilesDec = AppFilesDec;
//# sourceMappingURL=appFileDec.js.map