import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'
import {domainDocModule} from '@appDocs/modules/domain'
import {userInfoDocModule} from '@appDocs/modules/userInfo'
import {apiServicesDocModule} from '@appDocs/modules/apiServices'
import {envDocModule} from '@appDocs/modules/env'
import {appErrorDocModule} from '@appDocs/modules/appError'

type BlockNames = [
    'AuthService',
    'PtpClientAuthService',
    'PtpCoreAuthService',
]

export class AuthServicesDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.appendBlock(
            new CodeBlock('AuthService', 'auth/AuthService.tse')
                .setNavTitle('base auth')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('AuthService')
                        .appendText('Статичний клас авторизації')
                )
                .appendChildren(
                    new StepperBlock('AuthServiceMethods')
                        .appendSteep(new StepBlock('checkTokenAndGetUserInfo')
                            .appendText(
                                new TextBlock()
                                    .appendText('Приймає токен та повертає інформацію про користувача')
                                    .appendLink(userInfoDocModule.getPageBlockPath('userInfo', 'UserInfo'), 'UserInfo')
                                    .appendText('. Працює через')
                                    .appendLink(apiServicesDocModule.getPageBlockPath('authApiService', 'authApiService'), 'api сервіс авторизації')
                                    .appendText('. Для роботи потрібно вказати')
                                    .appendLink(envDocModule.getPageBlockPath('env', 'apiEnvUrls'), 'ENV.INIT_URL_FOR_CHECK_AUTH')
                                    .appendText('url до ендпоінту "introspect"')
                                    .appendLink(apiServicesDocModule.getPageBlockPath('authApiService', 'authApiService'), 'api сервісу авторизації')
                            )
                        )
                        .appendSteep(new StepBlock('checkSystemTokenAndGetUserInfo')
                            .appendText(
                                new TextBlock()
                                    .appendText('Приймає системний токен та повертає інформацію про користувача')
                                    .appendLink(userInfoDocModule.getPageBlockPath('userInfo', 'UserInfo'), 'UserInfo')
                                    .appendText('. Працює через')
                                    .appendLink(apiServicesDocModule.getPageBlockPath('authApiService', 'authApiService'), 'api сервіс авторизації')
                                    .appendText('. Якщо токен не системний викидає помилку. Для роботи потрібно вказати')
                                    .appendLink(envDocModule.getPageBlockPath('env', 'apiEnvUrls'), 'ENV.INIT_URL_FOR_CHECK_AUTH')
                                    .appendText('url до ендпоінту "introspect"')
                                    .appendLink(apiServicesDocModule.getPageBlockPath('authApiService', 'authApiService'), 'api сервісу авторизації')
                            )
                        )
                        .appendSteep(new StepBlock('getFullUserInfoByToken')
                            .appendText(
                                new TextBlock()
                                    .appendText('Приймає токен та повертає повну інформацію про користувача')
                                    .appendLink(userInfoDocModule.getPageBlockPath('userInfo', 'FullUserInfo'), 'FullUserInfo')
                                    .appendText('. Працює через')
                                    .appendLink(apiServicesDocModule.getPageBlockPath('authApiService', 'authApiService'), 'api сервіс авторизації')
                                    .appendText('. Для роботи потрібно вказати')
                                    .appendLink(envDocModule.getPageBlockPath('env', 'apiEnvUrls'), 'ENV.INIT_URL_AUTH_SERVICE')
                                    .appendText('url до')
                                    .appendLink(apiServicesDocModule.getPageBlockPath('authApiService', 'authApiService'), 'api сервісу авторизації')
                            )
                        )
                )
                .appendChildren(
                    new CodeBlock('authServiceExample', 'auth/authServiceExample.tse')
                        .setHeaderTitle('Приклад')
                )
        )
            .appendBlock(
                new CodeBlock('PtpClientAuthService', 'auth/PtpClientAuthService.tse')
                    .setNavTitle('ptp auth')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('PtpClientAuthService')
                            .appendText('Статичний клас авторизації ptp client сервісів')
                    )
                    .appendChildren(
                        new StepperBlock('PtpClientAuthServiceMethods')
                            .appendSteep(new StepBlock('checkTokenAndGetUserInfo')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Приймає токен та домен з якого візьме назву бд через')
                                        .appendLink(domainDocModule.getPageBlockPath('domain', 'DomainService'), 'DomainService.getDatabaseNameByDomain')
                                        .appendText('. Додатково приймає не обовязковий параметр масив ролей(якщо передано та немає жодної ролі буде викинута помилка')
                                        .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'UNAUTHORIZED_ERROR')
                                        .appendText('). Повертає інформацію про користувача')
                                        .appendLink(userInfoDocModule.getPageBlockPath('userInfo', 'PtpClientUserInfo'), 'PtpClientUserInfo')
                                        .appendText('. Працює через')
                                        .appendLink(apiServicesDocModule.getPageBlockPath('ptpClientUsersApiService', 'ptpClientUsersApiService'), 'api сервіс ptp client users')
                                        .appendText('. Для роботи потрібно вказати')
                                        .appendLink(envDocModule.getPageBlockPath('env', 'apiEnvUrls'), 'ENV.INIT_URL_PTP_USERS_SERVICE')
                                        .appendText('url до')
                                        .appendLink(apiServicesDocModule.getPageBlockPath('ptpClientUsersApiService', 'ptpClientUsersApiService'), 'api сервісу ptp client users')
                                )
                            )
                    )
                    .appendChildren(
                        new CodeBlock('authServiceExample', 'auth/ptpClientAuthServiceExample.tse')
                            .setHeaderTitle('Приклад')
                    )
            )
            .appendBlock(
                new CodeBlock('PtpCoreAuthService', 'auth/PtpCoreAuthService.tse')
                    .setNavTitle('ptp core auth')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('PtpCoreAuthService')
                            .appendText('Статичний клас авторизації ptp core сервісів')
                    )
                    .appendChildren(
                        new StepperBlock('PtpCoreAuthServiceMethods')
                            .appendSteep(new StepBlock('checkTokenAndGetUserInfo')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Приймає токен. Додатково приймає не обовязковий параметр масив ролей(якщо передано та немає жодної ролі буде викинута помилка')
                                        .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'UNAUTHORIZED_ERROR')
                                        .appendText('). Повертає інформацію про користувача')
                                        .appendLink(userInfoDocModule.getPageBlockPath('userInfo', 'PtpCoreUserInfo'), 'PtpCoreUserInfo')
                                        .appendText('. Працює через')
                                        .appendLink(apiServicesDocModule.getPageBlockPath('ptpCoreUsersApiService', 'ptpCoreUsersApiService'), 'api сервіс ptp core users')
                                        .appendText('. Для роботи потрібно вказати')
                                        .appendLink(envDocModule.getPageBlockPath('env', 'apiEnvUrls'), 'ENV.INIT_URL_PTP_CORE_USERS_SERVICE')
                                        .appendText('url до')
                                        .appendLink(apiServicesDocModule.getPageBlockPath('ptpCoreUsersApiService', 'ptpCoreUsersApiService'), 'api сервісу ptp core users')
                                )
                            )
                    )
                    .appendChildren(
                        new CodeBlock('authServiceExample', 'auth/ptpCoreAuthServiceExample.tse')
                            .setHeaderTitle('Приклад')
                    )
            )
        
        
    }
}

