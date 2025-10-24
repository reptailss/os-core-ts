import { DecoratorParam } from "../core";
import { PtpClientUserDto, PtpCoreUserDto } from "../../auth";
export declare const PtpClientUser: (roles?: Array<'admin'>) => DecoratorParam<PtpClientUserDto>;
export declare const PtpCoreUser: (roles?: Array<'admin'>) => DecoratorParam<PtpCoreUserDto>;
