import {RegisterApiMethodsDecorators} from '@decorators/core'

export function PostDec(path: string) {
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

export function PutDec(path: string) {
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

export function GetDec(path: string) {
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

export function DeleteDec(path: string) {
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


export function SystemPostDec(path: string) {
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

export function SystemPutDec(path: string) {
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

export function SystemGetDec(path: string) {
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

export function SystemDeleteDec(path: string) {
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


export function SendFileByPathDec(path: string, options: {
    root?: string
} = {}) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'sendFileByPath',
        })
    }
}

export function SendFileDec(path: string, options: {
    root?: string
} = {}) {
    return function(target: any, propertyKey: string) {
        RegisterApiMethodsDecorators.registerMethodDecorator({
            path,
            method: 'GET',
            target,
            propertyKey,
            type: 'sendFile',
        })
    }
}