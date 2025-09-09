import { CheckStructureAccessProps } from "../..";
export declare class StructureAccessService {
    static checkAccess(options: CheckStructureAccessProps): Promise<void>;
    static checkAccessByPluginApiKey(options: {
        service?: string;
        endpoint: string;
        legalEntityId: number;
        pluginApiKey: string;
    }): Promise<void>;
    static checkAccessByPluginApiKeyOrUserId(props: {
        service: string;
        endpoint: string;
        legalEntityId: number;
        openUserId?: number;
        pluginApiKey?: string;
    }): Promise<void>;
    private static getStructureResponse;
}
