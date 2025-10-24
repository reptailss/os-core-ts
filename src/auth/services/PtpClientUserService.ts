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
            user_name: 'pubma',
            is_admin: true,
            is_system: false,
        }
    }
    
    
}

