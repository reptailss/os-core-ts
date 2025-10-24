import { DecoratorMethod, DecoratorParam } from "../core";
export declare function Header(key: string, value: string): DecoratorMethod;
export declare const HeaderSetter: () => DecoratorParam<(name: string, value: number | string | readonly string[]) => void>;
