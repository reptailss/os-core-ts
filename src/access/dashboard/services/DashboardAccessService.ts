import {AuthService, FullUserInfo} from '@auth'
import {AppError} from '@appError'


export class DashboardAccessService {

    static async checkAccessByToken(token: string): Promise<FullUserInfo> {
        const response = await AuthService.getFullUserInfoByToken(token)
        if (
            !response?.roles?.length ||
            !response.roles.includes('ROLE_DASHBOARD_ADMIN')
        ) {
            throw new AppError('Access denied: user must have the ROLE_DASHBOARD_ADMIN role')
        }
        return response
    }
}

