"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFiles = exports.DeleteOldFileIfNull = exports.AppFile = void 0;
const core_1 = require("../core");
const AppFile = ({ fileKey, formats, required, }) => {
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
exports.AppFile = AppFile;
const DeleteOldFileIfNull = ({ fileKey, }) => {
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
exports.DeleteOldFileIfNull = DeleteOldFileIfNull;
const AppFiles = ({ formats, maxCount, minCount, fileKey, }) => {
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
exports.AppFiles = AppFiles;
//# sourceMappingURL=appFile.js.map