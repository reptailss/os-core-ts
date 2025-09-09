import {refreshTokenWithSave} from "@containers/auth/helpers/helpers";
import {BuildFetchOptionsCb, RequestOptions} from "@helpers/query/types";
import {buildFetchOptionsWithAuth} from "@helpers/query/helpers/buildFetchOptionsWithAuth";

export const refreshTokenAndRefetchResponse = async ({
                                                         buildFetchOptionsCb,
                                                         options: propsOptions,
                                                         url: propsUrl,

                                                     }: {

    buildFetchOptionsCb?: BuildFetchOptionsCb,
    options?: RequestOptions,
    url: string
}): Promise<Response | null> => {

    try {
        const res = await refreshTokenWithSave();
        if (!res) {
            return null
        }

        const {
            url,
            options
        } = buildFetchOptionsWithAuth({
            refreshToken: res.refresh_token,
            token: res.access_token,
            buildFetchOptionsCb,
            options: propsOptions,
            url: propsUrl
        })

        return await fetch(url, options);

    } catch (e) {
        return null
    }
}
