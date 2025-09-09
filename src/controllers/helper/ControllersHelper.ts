import {SystemEndpointsHelper} from '@helpers'

export class ControllersHelper {

    static buildEndpointUrl({
                                endpointPath,
                                isSystemEndpoint,
                            }: {
        endpointPath: string
        isSystemEndpoint: boolean
    }): string {
        if (!isSystemEndpoint) {
            return endpointPath
        }
        return SystemEndpointsHelper.buildSystemEndpointUrl(endpointPath)
    }

}