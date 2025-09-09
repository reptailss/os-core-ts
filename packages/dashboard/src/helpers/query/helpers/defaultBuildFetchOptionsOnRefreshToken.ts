import {BuildFetchOptionsCb} from "@helpers/query/types";


export const defaultBuildFetchOptionsOnRefreshToken: BuildFetchOptionsCb = ({
                                                                                              url,
                                                                                              options,
                                                                                              tokens
                                                                                          }) => {
    return {
        url,
        options: {
            ...options,
            headers: {
                ...(options?.headers ?? {}),
                Authorization: "Bearer " + tokens.access_token,
            }
        }
    }
}
