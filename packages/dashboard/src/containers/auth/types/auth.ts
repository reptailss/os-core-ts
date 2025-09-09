
export interface ParamsGetToken {
    username: string,
    password: string
}

export interface TokensData {
    access_token:string,
    expires_in: number,
    refresh_token: string,
}

export interface RefreshTokensData{
    access_token:string,
    expires_in: number,
    id_token: null,
    refresh_token: string,
    token_type: string,
}
export interface Tokens{
    access_token:string,
    refresh_token: string,
    expires_in: number | null,
}


export interface IAuthenticateBody{
    accountCode: string,
    login: string,
    "password": string
}
