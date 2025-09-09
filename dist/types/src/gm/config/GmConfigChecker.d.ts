import { GmConfig } from "..";
export declare class GmConfigChecker {
    static hasActionLogger(config: GmConfig, endpointType: 'add' | 'delete' | 'update'): boolean;
    static hasStructureAccess(config: GmConfig, endpointType: 'add' | 'delete' | 'update' | 'list' | 'get'): boolean;
    static hasAuth(config: GmConfig, endpointType: 'add' | 'delete' | 'update' | 'list' | 'get'): boolean;
}
