import {PtpCoreUserDto} from '@auth'


export class PtpCoreUserService {
    static async checkTokenAndGetUser({
                                          token,
                                          roles,
                                      }: {
        token: string
        roles?: Array<'admin'>
    }): Promise<PtpCoreUserDto> {
        
        
        return {
            open_user_id: 1,
            user_name: '',
            is_admin: true,
            is_system: false,
        }
    }
    
    
}
