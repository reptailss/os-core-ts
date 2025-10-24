import {FullUserDto, UserDto} from '@auth'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'


export class AuthService {
    public static async checkTokenAndGetUser(token: string): Promise<UserDto> {
        return {
            open_user_id: 1,
            user_name: 'User',
            is_system: false,
        }
    }
    
    public static async checkSystemTokenAndGetUser(token: string): Promise<UserDto> {
        return {
            open_user_id: 1,
            user_name: 'User',
            is_system: true,
        }
    }
    
    public static async getFullUserByToken(accessToken: string): Promise<FullUserDto> {
       return  {
           id: 1,
           name: 'timon',
           nickname: '',
           profile: '' ,
           picture: '',
           website: '',
           email: '',
           gender: '',
           birthdate: '',
           locale: '',
           address: '',
           parent_id: 1,
           referral_code: 1,
           given_name: 'timon',
           family_name: 'pubma',
           middle_name: 'pubma',
           preferred_username: '',
           email_verified: 1 ,
           phone_number: '',
           phone_number_verified:1,
           updated_at: 1,
           use_2fa_auth: 0,
           use_2fa_sms: 0,
           use_2fa_email: 0,
           roles: ['ROLE_DASHBOARD_ADMIN'],
           sub: '',
       }
    }
    
    public static async systemGetUserByOpenUserId(openUserId: number): Promise<{
        id: number
        family_name: string
        given_name: string
        middle_name: string | null
        email: string | null
        birthdate: string | null
        picture: string | null
        parent_id: number | null
        gender: 'male' | 'female' | null
    } | null> {
        return {
            id: 1,
            birthdate: '',
            email: '',
            given_name:  'timon',
            middle_name: 'pumba',
            parent_id:  1,
            family_name: 'pumba',
            picture:  '',
            gender: 'male',
        }
    }
    
}

