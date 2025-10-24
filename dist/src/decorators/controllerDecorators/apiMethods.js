"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendFile = exports.SendFileByPath = exports.SystemDelete = exports.SystemGet = exports.SystemPut = exports.SystemPost = exports.Delete = exports.Get = exports.Put = exports.Post = void 0;
const core_1 = require("../core");
function Post(path) {
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
exports.Post = Post;
function Put(path) {
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
exports.Put = Put;
function Get(path) {
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
exports.Get = Get;
function Delete(path) {
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
exports.Delete = Delete;
function SystemPost(path) {
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
exports.SystemPost = SystemPost;
function SystemPut(path) {
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
exports.SystemPut = SystemPut;
function SystemGet(path) {
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
exports.SystemGet = SystemGet;
function SystemDelete(path) {
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
exports.SystemDelete = SystemDelete;
function SendFileByPath(path, options = {}) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'sendFileByPath',
            options,
        });
    };
}
exports.SendFileByPath = SendFileByPath;
function SendFile(path, options = {}) {
    return function (target, propertyKey) {
        core_1.RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'sendFile',
            options,
        });
    };
}
exports.SendFile = SendFile;
//# sourceMappingURL=apiMethods.js.map