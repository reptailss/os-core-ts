import { DecoratorParam } from "../core";
import { PtpClientUserInfo, PtpCoreUserInfo } from "../../auth";
export declare const PtpClientAuthDec: (roles?: Array<'admin'>) => DecoratorParam<PtpClientUserInfo>;
export declare const PtpCoreAuthDec: (roles?: Array<'admin'>) => DecoratorParam<PtpCoreUserInfo>;
