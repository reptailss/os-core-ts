import {AuthService, FullUserDto} from '@auth'
import {AppError} from '@appError'


export class DashboardUserService {

    static async checkAccessByToken(token: string): Promise<FullUserDto> {
        const response = await AuthService.getFullUserByToken(token)
        if (
            !response?.roles?.length ||
            !response.roles.includes('ROLE_DASHBOARD_ADMIN')
        ) {
            throw new AppError('Access denied: user must have the ROLE_DASHBOARD_ADMIN role')
        }
        return response
    }
}

