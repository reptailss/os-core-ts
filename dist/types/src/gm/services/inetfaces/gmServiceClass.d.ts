import { GmModuleConstructorProp, IGmService } from "../../core";
export interface IGmServiceClass extends IGmService {
    serviceType: 'class';
    getConstructorProp(): GmModuleConstructorProp;
}
