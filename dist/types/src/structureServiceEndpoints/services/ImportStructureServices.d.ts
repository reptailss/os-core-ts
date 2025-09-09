import { ImportResult } from "../../responseFormat";
export declare class ImportStructureServicesService {
    static importServices({ service_key, endpoints, type, }: {
        service_key: string;
        type: 'default' | 'plugin';
        endpoints: {
            key: string;
            name: string;
        }[];
    }): Promise<ImportResult>;
}
