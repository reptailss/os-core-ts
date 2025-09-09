import {GmConfig, GmEndpointType} from '@gm'

export class GmEndpointsUrlsHelper {
    static getEndpointUrl = (
        config: GmConfig,
        endpointType: GmEndpointType,
    ) => {
        return `/${endpointType}`

    }
}