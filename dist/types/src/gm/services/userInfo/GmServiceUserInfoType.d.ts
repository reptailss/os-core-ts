import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServiceUserInfoType extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getUserInfoType(): string;
}
