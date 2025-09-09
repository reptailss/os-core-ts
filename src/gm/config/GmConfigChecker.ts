import {GmConfig} from '@gm'

export class GmConfigChecker {
    static hasActionLogger(
        config: GmConfig,
        endpointType: 'add' | 'delete' | 'update',
    ): boolean {
        if (endpointType in config.endpoints) {
            const endpoint = config.endpoints[endpointType]
            return endpoint.hasActionLogger
        }
        return false
    }

    static hasStructureAccess(
        config: GmConfig,
        endpointType: 'add' | 'delete' | 'update' | 'list' | 'get',
    ): boolean {
        if (endpointType in config.endpoints) {
            const endpoint = config.endpoints[endpointType]
            return endpoint.hasStructureAccess
        }
        return false
    }

    static hasAuth(
        config: GmConfig,
        endpointType: 'add' | 'delete' | 'update' | 'list' | 'get',
    ): boolean {

        const endpointAuth = config.endpoints[endpointType]?.hasAuth

        return endpointAuth ||
            (!endpointAuth && (
            (endpointType === 'add' || endpointType === 'update' || endpointType === 'delete') &&
            this.hasActionLogger(config, endpointType) ||
            this.hasStructureAccess(config, endpointType)
        ))
    }
}
