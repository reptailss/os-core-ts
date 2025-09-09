

export function addQueryParamsWithoutRouter(params: { [key: string]: string }): void {
    const url = new URL(window.location.href);

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            url.searchParams.set(key, params[key]);
        }
    }

    window.history.replaceState({}, '', url.toString());
}

export function getQueryParams(key: string): string | null {
    const url = new URL(window.location.href);
    return url.searchParams.get(key);
}
