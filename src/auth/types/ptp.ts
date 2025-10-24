import {UserDto} from '@auth'

export type PtpCoreUserDto = UserDto & {
    is_admin: boolean
}

export type PtpClientUserDto = UserDto & {
    is_admin: boolean
}