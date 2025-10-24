export declare function EntityPrimaryNumberKey(): (target: any, propertyKey: string) => void;
export declare function EntityPrimaryStringKey(): (target: any, propertyKey: string) => void;
export declare function EntityDateAdd(): (target: any, propertyKey: string) => void;
export declare function EntityDateUpdate(): (target: any, propertyKey: string) => void;
export declare function EntityInteger(options?: {
    allowNull?: boolean;
    defaultValue?: number | null;
}): (target: any, propertyKey: string) => void;
export declare function EntityBigInt(options?: {
    allowNull?: boolean;
    defaultValue?: number | null;
}): (target: any, propertyKey: string) => void;
export declare function EntityFloat(options?: {
    allowNull?: boolean;
    defaultValue?: number | null;
}): (target: any, propertyKey: string) => void;
export declare function EntityBoolean(options?: {
    allowNull?: boolean;
    defaultValue?: boolean | null;
}): (target: any, propertyKey: string) => void;
export declare function EntityString(options?: {
    allowNull?: boolean;
    defaultValue?: string | null;
    length?: number;
}): (target: any, propertyKey: string) => void;
export declare function EntityText(options?: {
    allowNull?: boolean;
    defaultValue?: string;
    length?: 'tiny' | 'medium' | 'long';
}): (target: any, propertyKey: string) => void;
export declare function EntityDate(options?: {
    allowNull?: boolean;
    defaultValue?: Date | 'CURRENT_TIMESTAMP' | null;
}): (target: any, propertyKey: string) => void;
export declare function EntityJson(options?: {
    allowNull?: boolean;
    defaultValue?: object | null;
}): (target: any, propertyKey: string) => void;
