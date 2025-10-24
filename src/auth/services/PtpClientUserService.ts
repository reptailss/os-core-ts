import {PtpClientUserDto} from '@auth'


export class PtpClientUserService {
    static async checkTokenAndGetUser({
                                          token,
                                          domain,
                                          roles,
                                      }: {
        token: string,
        domain: string
        roles?: Array<'admin'>
    }): Promise<PtpClientUserDto> {
        
        return {
            open_user_id: 1,
            user_name: '',
            is_admin: true,
            is_system: false,
        }
    }
    
    
}

