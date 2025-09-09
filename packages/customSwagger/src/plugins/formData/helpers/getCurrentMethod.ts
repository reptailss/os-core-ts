export const getCurrentMethod = ({
                              request,
                              spec,
                          }: {
    request: Request,
    spec: any
}): any | null => {
    const currentUrl = new URL(request.url)
    const path = currentUrl.pathname
    if (!(path in spec.paths)) {
        return null
    }
    const endpoint = spec.paths[path]

    if (!(request.method.toLowerCase() in endpoint) && !(request.method in endpoint)) {
        return null
    }

    return request.method in endpoint ? endpoint[request.method] : endpoint[request.method.toLowerCase()]
}
