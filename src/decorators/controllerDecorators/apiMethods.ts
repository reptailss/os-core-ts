import {RegisterApiMethodsDecorators} from '@decorators/core'

export function Post(path: string) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'POST',
            target,
            propertyKey,
            type: 'default',
        })
    }
}

export function Put(path: string) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'PUT',
            target,
            propertyKey,
            type: 'default',
        })
    }
}

export function Get(path: string) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'default',
        })
    }
}

export function Delete(path: string) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'DELETE',
            target,
            propertyKey,
            type: 'default',
        })
    }
}


export function SystemPost(path: string) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'POST',
            target,
            propertyKey,
            type: 'system',
        })
    }
}

export function SystemPut(path: string) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'PUT',
            target,
            propertyKey,
            type: 'system',
        })
    }
}

export function SystemGet(path: string) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'system',
        })
    }
}

export function SystemDelete(path: string) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'DELETE',
            target,
            propertyKey,
            type: 'system',
        })
    }
}


export function SendFileByPath(path: string, options: {
    root?: string
} = {}) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'sendFileByPath',
            options,
        })
    }
}

export function SendFile(path: string, options: {
    root?: string
} = {}) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'sendFile',
            options,
        })
    }
}