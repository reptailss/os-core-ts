import { ArgControllerEndpoint } from "../../controllers";
import { SwaggerBaseInfo } from "../../swagger/core";
export declare class ControllerDecoratorsBuilder {
    static addArgToMethod({ target, _propertyKey, arg, }: {
        target: any;
        arg: ArgControllerEndpoint;
        _propertyKey: string;
    }): void;
    static addImportStructureServiceToMethod({ target, _propertyKey, name, key, }: {
        target: any;
        _propertyKey: string;
        name: string;
        key?: string;
    }): void;
    static setHeaderToMethod({ target, _propertyKey, key, value, }: {
        target: any;
        _propertyKey: string;
        key: string;
        value: string;
    }): void;
    static addSwaggerInfoToMethod({ target, _propertyKey, baseInfo, }: {
        target: any;
        _propertyKey: string;
        baseInfo: SwaggerBaseInfo;
    }): void;
}
