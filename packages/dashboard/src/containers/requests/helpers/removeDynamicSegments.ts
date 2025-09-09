export const removeDynamicSegments = (routes: string[]): string[] => {
    return routes.map(route => removeDynamicSegment(route));
};


export const removeDynamicSegment = (route: string): string => {
        return route.replace(/\/:\w+/g, '').replace(/\?.*$/, '')
};
