"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderSetter = exports.Header = void 0;
const core_1 = require("../core");
function Header(key, value) {
    return function (target, _propertyKey, descriptor) {
        const endpoints = target.constructor.endpoints || [];
        const endpoint = endpoints.find((endpoint) => endpoint._propertyKey === _propertyKey);
        if (!endpoint) {
            return;
        }
        core_1.ControllerDecoratorsBuilder.setHeaderToMethod({
            target,
            _propertyKey,
            key,
            value,
        });
    };
}
exports.Header = Header;
const HeaderSetter = () => {
    return (target, _propertyKey, _parameterIndex) => {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                key: 'SetHeaderFn',
                _parameterIndex,
            },
        });
    };
};
exports.HeaderSetter = HeaderSetter;
//# sourceMappingURL=setHeader.js.map