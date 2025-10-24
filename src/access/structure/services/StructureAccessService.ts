import {CheckStructureAccessProps} from '@access'


export class StructureAccessService {
    
    static async checkAccess(options: CheckStructureAccessProps): Promise<void> {
    
    }
    
    
    static async checkAccessByPluginApiKey(options: {
        service?: string
        endpoint: string
        legalEntityId: number
        pluginApiKey: string
    }): Promise<void> {
    
    }
    
    static async checkAccessByPluginApiKeyOrUserId(props: {
        service: string
        endpoint: string
        legalEntityId: number
        openUserId?: number
        pluginApiKey?: string
    }): Promise<void> {
    
    }
}

