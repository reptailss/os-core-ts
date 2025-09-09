export interface DecoratorParam<Result> {
    (target: Object, _propertyKey: string, parameterIndex: number): void;
}

export interface DecoratorMethod {
    (target: any, _propertyKey: string, descriptor: PropertyDescriptor): void;
}

export interface DecoratorClass{
    (constructor: any): void;
}
