import {PropsApiRequest} from "@helpers/query/types";
import {isTokenExpired, logOut, refreshTokenWithSave} from "@containers/auth/helpers/helpers";
import {getCookie} from "@helpers/cookie/cookie";
import {defaultBuildFetchOptionsOnRefreshToken} from "@helpers/query/helpers/defaultBuildFetchOptionsOnRefreshToken";
import {refreshTokenAndRefetchResponse} from "@helpers/query/helpers/refreshTokenAndRefetchResponse";
import {buildFetchOptionsWithAuth} from "@helpers/query/helpers/buildFetchOptionsWithAuth";

export const apiRequestWithAuth = async <T>({
                                                 url: propsUrl,
                                                 options: propsOptions = {},
                                                 onError,
                                                 hasTransformToJson = true,
                                                 buildFetchOptionsCb = defaultBuildFetchOptionsOnRefreshToken,
                                                 hasLogOutOnErrorAuth = true
                                             }: PropsApiRequest): Promise<T> => {
    let token = getCookie('access_token');
    let refreshToken = getCookie('refresh_token');

    const tokenExpire = isTokenExpired(token);

    if (tokenExpire) {
        if (!refreshToken) {
            if (hasLogOutOnErrorAuth) {
                logOut();
            }
            return null as T
        }
        const res = await refreshTokenWithSave();
        if (!res) {
            if (hasLogOutOnErrorAuth) {
                logOut();
            }
            return null as T
        }
        token = res.access_token
        refreshToken = res.refresh_token
    }

    let {
        url,
        options
    } = buildFetchOptionsWithAuth({
        buildFetchOptionsCb,
        options: propsOptions,
        url: propsUrl,
        token,
        refreshToken
    })

    try {
        let resp = await fetch(url, options);

        if (resp.status === 403) {
            const res = await refreshTokenWithSave();
            if (!res) {
                if (hasLogOutOnErrorAuth) {
                    logOut();
                }
                return null as T
            }
            const newResp = await refreshTokenAndRefetchResponse({
                buildFetchOptionsCb,
                options,
                url,
            })
            if (!newResp) {
                if (hasLogOutOnErrorAuth) {
                    logOut();
                }
                return null as T
            }
            resp = newResp

        }

        if (!resp.ok) {
            let errors = {};
            try {
                await resp?.json().then((error) => {
                    errors = error;
                    if (onError) {
                        onError(error)
                    }
                });
                return Promise.reject({
                    status: resp.status,
                    ...(errors ?? {}),
                });
            } catch (error) {
                if (onError) {
                    onError(error)
                }
                return Promise.reject({
                    status: resp.status,
                    ...(errors ?? {}),
                });
            }

        }
        if (!hasTransformToJson) {
            return resp as any
        }
        if (!resp) {
            return null as T
        }
        return resp?.json();
    } catch (error: any) {
        if (onError) {
            onError(error)
        }
        if (error?.status === 403) {
            const resp = await refreshTokenAndRefetchResponse({
                buildFetchOptionsCb,
                options,
                url,
            })
            if (!resp) {
                if (hasLogOutOnErrorAuth) {
                    logOut();
                }
                return null as T
            }
            if (!hasTransformToJson) {
                return resp as any
            }
            if (!resp) {
                return null as T
            }
            return resp?.json();
        }

        return Promise.reject(error);
    }
};
