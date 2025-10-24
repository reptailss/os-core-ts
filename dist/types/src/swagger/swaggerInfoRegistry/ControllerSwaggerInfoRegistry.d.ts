import { ControllerSwaggerInfo } from "../core";
import { ControllerMeta } from "../../controllers";
export declare class ControllerSwaggerInfoRegistry {
    static addFromControllers({ controllers, baseSwaggerTag, }: {
        controllers: ControllerMeta[];
        baseSwaggerTag?: string;
    }): void;
    static add({ controller, baseSwaggerTag, }: {
        controller: ControllerMeta;
        baseSwaggerTag?: string;
    }): void;
    static getSwaggerInfoList(): ControllerSwaggerInfo[];
}
