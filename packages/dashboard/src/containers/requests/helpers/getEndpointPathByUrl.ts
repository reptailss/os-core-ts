export const getEndpointPathByUrl = (
    url: string,
    routes: string[]
): string => {

    const cleanUrl = url.split('?')[0];

    for (const route of routes) {
        const routeParts = route.split('/').filter(Boolean);
        const urlParts = cleanUrl.split('/').filter(Boolean);

        if (routeParts.length !== urlParts.length) {
            continue;
        }

        let isMatch = true;

        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
                continue;
            }
            if (routeParts[i] !== urlParts[i]) {
                isMatch = false;
                break;
            }
        }

        if (isMatch) {
            return route;
        }
    }

    return url;
};
