export interface RequestOptions {
    method?: string;
    headers?: any;
    body?: any;
    showError?: boolean,
}

export type TypeOnErrorFn = (error: any) => void

export interface PropsApiRequest {
    url: string,
    options?: RequestOptions,
    onError?: TypeOnErrorFn,
    hasTransformToJson?: boolean,
    buildFetchOptionsCb?: BuildFetchOptionsCb,
    hasLogOutOnErrorAuth?:boolean
}

export interface ISerializeItem {
    [key: string]: string | number | ISerializeItem | any
}


export type PropsBuildFetchOptions = {
    url: string,
    options?: RequestOptions,
    tokens: {
        access_token: string,
        refresh_token?: string
    }
}
export type BuildFetchOptionsCb = (props: PropsBuildFetchOptions) => {
    url: string,
    options?: RequestOptions
}
