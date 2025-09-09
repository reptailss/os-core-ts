import { IGmService } from "../../core";
export interface IGmServiceFn extends IGmService {
    serviceType: 'fn';
}
