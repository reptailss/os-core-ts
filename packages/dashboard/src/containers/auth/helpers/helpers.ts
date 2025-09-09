import {refreshToken} from "@containers/auth/api/api";
import {getCookie, setCookie} from "@helpers/cookie/cookie";
import {Tokens, TokensData} from "@containers/auth/types/auth";


export const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;

export const getUnixTime = () => Math.round(+new Date() / 1000);
export const getTokenLeftTime = (token: string) => {
    if (!token) {
        return
    }
    const tokenInfo = token.split('.')[1];
    const tokenInfoDecoded = window.atob(tokenInfo);
    const {exp, iat} = JSON.parse(tokenInfoDecoded);

    return exp - getUnixTime();
}

export const isTokenExpired = (token: string) => {
    if (!token) {
        return true
    }

    try {
        const tokenInfo = token.split('.')[1];
        const tokenInfoDecoded = window.atob(tokenInfo);
        const {exp, iat} = JSON.parse(tokenInfoDecoded);

        const tokenLeftTime = exp - getUnixTime();

        const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER;

        return tokenLeftTime < minLifeTimeForUpdate
    } catch (e) {
        return true
    }
};

export const clearAuthCookie = () => {
    setCookie("access_token", '', {"max-age": -1,});
    setCookie("refresh_token", '', {"max-age": -1,});
}

export const logOut = () => {
    clearAuthCookie()

}
export const saveTokens = (tokens: Tokens) => {
    if (!tokens) {
        return
    }
    const {
        access_token,
        refresh_token,
    } = tokens;
    setCookie('refresh_token', refresh_token)
    setCookie('access_token', access_token)

}


export const refreshTokenWithSave = async (): Promise<TokensData> => {

    const res = await refreshToken()
    saveTokens(res)

    return {
        access_token: res.access_token,
        refresh_token: res.refresh_token,
        expires_in: res.expires_in
    }
}

export const checkToken = async (): Promise<false | Tokens> => {


    const access_token = getCookie('access_token');
    const refresh_token = getCookie('refresh_token');


    if (!refresh_token && !access_token) {
        return false
    }

    if (access_token) {
        const tokenExpire = isTokenExpired(access_token);
        if (!tokenExpire) {
            return {access_token, refresh_token, expires_in: null,};
        }
        if (tokenExpire && !refresh_token) {
            return false;
        }
        if (tokenExpire && refresh_token) {
            const refreshTokenExpire = isTokenExpired(refresh_token);
            if (refreshTokenExpire) {
                return false;
            }

            const res = await refreshTokenWithSave();
            if (!res) {
                return false;
            }
            return res;
        }
        return false
    }

    if (refresh_token) {
        return await refreshTokenWithSave();
    }

    return false
}
