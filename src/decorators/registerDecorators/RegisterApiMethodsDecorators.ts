export class RegisterApiMethodsDecorators {
    
    static registerMethodDecorator(
        {
            path,
            type,
            method,
            target,
            propertyKey,
        }: {
            path: string,
            type: 'default' | 'system' | 'sendFileByPath' | 'sendFile',
            method: 'GET' | 'POST' | 'PUT' | 'DELETE' | string,
            target: any,
            propertyKey: string,
        },
    ) {
        if (!target.constructor.endpoints) {
            target.constructor.endpoints = []
        }
        
        target.constructor.endpoints.push({
                method: method as 'GET' | 'POST' | 'PUT' | 'DELETE',
                path,
                _propertyKey: propertyKey,
                type,
            },
        )
    }
}