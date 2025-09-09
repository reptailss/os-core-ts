import {PropsApiRequest} from "@helpers/query/types";

export const apiRequest = async <T>({url, options = {},onError}:PropsApiRequest):Promise<T> => {
    try {
        let resp = await fetch(url, options);

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
            } catch (error:any) {
                if (onError) {
                    onError(error)
                }
                return Promise.reject({
                    status: resp.status,
                    ...(errors ?? {}),
                });
            }

        }
        if(!resp){
            return null as T
        }
        return resp?.json();
    } catch (error:any) {
        if (onError) {
            onError(error)
        }
        return Promise.reject(error);
    }
};
