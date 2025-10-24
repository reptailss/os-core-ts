import 'reflect-metadata';
import {DI_INJECT_KEY} from '@di'

export function Inject(token: string | symbol | Function) {
    return (target: Object, _propertyKey: string | symbol | undefined, parameterIndex?: number) => {
        if (parameterIndex === undefined) return;
        const ctor = typeof target === 'function' ? target : target.constructor;
        
        const existing: any[] = Reflect.getMetadata(DI_INJECT_KEY, ctor) || [];
        existing[parameterIndex] = token;
        Reflect.defineMetadata(DI_INJECT_KEY, existing, ctor);
    };
}