import {BuildFetchOptionsCb, RequestOptions} from "@helpers/query/types";
import {defaultBuildFetchOptionsOnRefreshToken} from "@helpers/query/helpers/defaultBuildFetchOptionsOnRefreshToken";

export const buildFetchOptionsWithAuth = ({
                                              buildFetchOptionsCb = defaultBuildFetchOptionsOnRefreshToken,
                                              options,
                                              url,
                                              token,
                                              refreshToken,
                                          }: {
    buildFetchOptionsCb?: BuildFetchOptionsCb,
    url: string,
    options?: RequestOptions,
    token: string,
    refreshToken: string,
}): {
    url: string,
    options?: RequestOptions,
} => {

    const {
        options: newOptions,
        url: newUrl,
    } = buildFetchOptionsCb({
        options,
        tokens: {
            access_token: token,
            refresh_token: refreshToken,
        },
        url
    })
    return {
        options: newOptions,
        url: newUrl,
    }
}
