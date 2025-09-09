export class SystemEndpointsHelper {

    public static buildSystemEndpointUrl(url: string) {
        if (!url?.length) {
            return '/inner'
        }
        if (url[0] !== '/') {
            return `/_inner/${url}`
        }
        return `/_inner${url}`
    }
}