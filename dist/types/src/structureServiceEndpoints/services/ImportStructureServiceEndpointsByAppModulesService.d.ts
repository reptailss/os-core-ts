import { IAppModule } from "../../appModule";
export declare class ImportStructureServiceEndpointsByAppModulesService {
    importByAppModules(appModules: IAppModule[], type: 'default' | 'plugin'): Promise<void>;
    private getImportStructureServicesEndpointsByAppModule;
}
