"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendFileDec = exports.SendFileByPathDec = exports.SystemDeleteDec = exports.SystemGetDec = exports.SystemPutDec = exports.SystemPostDec = exports.DeleteDec = exports.GetDec = exports.PutDec = exports.PostDec = void 0;
const core_1 = require("../core");
function PostDec(path) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'POST',
            target,
            propertyKey,
            type: 'default',
        });
    };
}
exports.PostDec = PostDec;
function PutDec(path) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'PUT',
            target,
            propertyKey,
            type: 'default',
        });
    };
}
exports.PutDec = PutDec;
function GetDec(path) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'default',
        });
    };
}
exports.GetDec = GetDec;
function DeleteDec(path) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'DELETE',
            target,
            propertyKey,
            type: 'default',
        });
    };
}
exports.DeleteDec = DeleteDec;
function SystemPostDec(path) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'POST',
            target,
            propertyKey,
            type: 'system',
        });
    };
}
exports.SystemPostDec = SystemPostDec;
function SystemPutDec(path) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'PUT',
            target,
            propertyKey,
            type: 'system',
        });
    };
}
exports.SystemPutDec = SystemPutDec;
function SystemGetDec(path) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'system',
        });
    };
}
exports.SystemGetDec = SystemGetDec;
function SystemDeleteDec(path) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'DELETE',
            target,
            propertyKey,
            type: 'system',
        });
    };
}
exports.SystemDeleteDec = SystemDeleteDec;
function SendFileByPathDec(path, options = {}) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'sendFileByPath',
        });
    };
}
exports.SendFileByPathDec = SendFileByPathDec;
function SendFileDec(path, options = {}) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'sendFile',
        });
    };
}
exports.SendFileDec = SendFileDec;
//# sourceMappingURL=apiMethods.js.map