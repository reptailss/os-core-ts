import {apiRequest} from "@helpers/query/apiRequest";
import {serialize} from "@helpers/query/serialize";
import {BASE_URL_AUTH} from "@constants/config";
import {User} from "@containers/user/types";

export const getUserInfo = async (access_token: string) => {
    if (!access_token) {
        return null
    }
    const url = `${BASE_URL_AUTH}/v1/userinfo?` + serialize({
            access_token,
        }
    )

    return apiRequest<User>({
        url,
        options: {
            method: 'GET'
        },
    })

}
