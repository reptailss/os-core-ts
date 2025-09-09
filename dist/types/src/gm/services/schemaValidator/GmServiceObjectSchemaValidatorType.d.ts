import { GmAbstractServiceFn, GmExport, IGmService } from "../../core";
export declare class GmServiceObjectSchemaValidatorType extends GmAbstractServiceFn implements IGmService {
    getExport(): GmExport;
    getServiceName(): string;
    getSchemaValidatorType(baseType: string): string;
}
