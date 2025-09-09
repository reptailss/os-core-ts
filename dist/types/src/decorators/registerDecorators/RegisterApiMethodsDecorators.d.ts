export declare class RegisterApiMethodsDecorators {
    static registerMethodDecorator({ path, type, method, target, propertyKey, }: {
        path: string;
        type: 'default' | 'system' | 'sendFileByPath' | 'sendFile';
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | string;
        target: any;
        propertyKey: string;
    }): void;
}
