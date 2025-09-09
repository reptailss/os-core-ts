import {UserInfo} from '@auth'

export type PtpCoreUserInfo = UserInfo & {
    is_admin: boolean
}

export type PtpClientUserInfo = UserInfo & {
    is_admin: boolean
}