"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetResponseStatusDec = void 0;
const core_1 = require("../core");
const SetResponseStatusDec = (target, _propertyKey, _parameterIndex) => {
    core_1.ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'SetResponseStatus',
        },
    });
};
exports.SetResponseStatusDec = SetResponseStatusDec;
//# sourceMappingURL=setResponseStatusDec.js.map