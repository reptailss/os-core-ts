import {BASE_URL_AUTH, CLIENT_ID, CLIENT_SECRET} from "@constants/config";
import {serialize} from "@helpers/query/serialize";
import {apiRequest} from "@helpers/query/apiRequest";
import {ParamsGetToken, RefreshTokensData, TokensData} from "@containers/auth/types/auth";
import {getCookie} from "@helpers/cookie/cookie";

export const refreshToken = async (refreshToken?:string): Promise<RefreshTokensData> => {

    const url = `${BASE_URL_AUTH}/v1/token?` + serialize({
            grant_type: 'refresh_token',
            refresh_token:refreshToken || getCookie('refresh_token'),
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }
    )

    return apiRequest<RefreshTokensData>({
        url,
        options: {
            method: 'GET'
        }
    })
}


export const authenticate = async ({username, password}: ParamsGetToken): Promise<TokensData> => {

    const url = `${BASE_URL_AUTH}/v1/token?` + serialize({
            grant_type: 'password',
            username,
            password,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }
    )
    return await apiRequest<TokensData>({
        url,
        options: {
            method: "GET",
        }
    });
}
