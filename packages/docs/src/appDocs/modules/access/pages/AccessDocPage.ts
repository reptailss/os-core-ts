import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'
import {authDocModule} from '@appDocs/modules/auth'
import {userInfoDocModule} from '@appDocs/modules/userInfo'
import {appErrorDocModule} from '@appDocs/modules/appError'

type BlockNames = [
    'DashboardAccessService',
    'StructureAccessService',
    'PtpAdminChecker'
]

export class AccessDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.appendBlock(
            new CodeBlock('DashboardAccessService', 'access/DashboardAccessService.tse')
                .setNavTitle('dashboard')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('DashboardAccessService')
                        .appendText('Статичний клас для перевірки доступу до дашборду')
                )
                .appendChildren(
                    new StepperBlock('DashboardAccessServiceMethods')
                        .appendSteep(
                            new StepBlock('checkAccessByToken()')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Приймає токен та отримує з нього інформацію про користувача за допомогою')
                                        .appendLinkFromObject(authDocModule.getBlockPathAndTitle('auth', 'AuthService'))
                                        .appendText(' перевіряє чи має користувач в масиві roles ->')
                                        .appendPrimaryText('ROLE_DASHBOARD_ADMIN')
                                        .appendText('.В разі успіху повертає Інформацію про користувача')
                                        .appendLinkFromObject(userInfoDocModule.getBlockPathAndTitle('userInfo', 'FullUserInfo'))
                                )
                        )
                )
                .appendChildren(
                    new CodeBlock('dashboardAccessServiceExample', 'access/dashboardAccessServiceExample.tse')
                        .setHeaderTitle('Приклад')
                )
        )
            .appendBlock(
                new CodeBlock('StructureAccessService', 'access/StructureAccessService.tse')
                    .setNavTitle('structure')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('StructureAccessService')
                            .appendText('Статичний клас для перевірки доступу через структуру')
                    )
                    .appendChildren(
                        new StepperBlock('StructureAccessServiceMethods')
                            .appendSteep(
                                new StepBlock('StructureAccessService()')
                                    .appendText(
                                        new TextBlock()
                                            .appendText('Перевіряє доступ користувача до юо особи. Приймає ключ сервісу, ендпоінт, ід користувача та юр особи. В разі відсутності доступу викидає помилку з кодом')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'STRUCTURE_ACCESS_ERROR')
                                    )
                            )
                            .appendSteep(
                                new StepBlock('checkAccessByPluginApiKey()')
                                    .appendText(
                                        new TextBlock()
                                            .appendText('Перевіряє доступ користувача до юо особи за допомогою')
                                            .appendPrimaryText('pluginApiKey')
                                            .appendText('(Генерується в дашборді сервісу структури). В разі відсутності доступу викидає помилку з кодом')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'STRUCTURE_ACCESS_ERROR')
                                    )
                            )
                            .appendSteep(
                                new StepBlock('checkAccessByPluginApiKeyOrUserId()')
                                    .appendText(
                                        new TextBlock()
                                            .appendText('Перевіряє доступ користувача до юо особи за допомогою')
                                            .appendPrimaryText('pluginApiKey')
                                            .appendText('або ід користувача.')
                                            .appendText('В разі відсутності доступу викидає помилку з кодом')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'STRUCTURE_ACCESS_ERROR')
                                    )
                            )
                    )
                    .appendChildren(
                        new CodeBlock('structureAccessServiceExample', 'access/structureAccessServiceExample.tse')
                            .setHeaderTitle('Приклад')
                    )
            )
            .appendBlock(
                new CodeBlock('PtpAdminChecker', 'access/PtpAdminChecker.tse')
                    .setNavTitle('ptp admin')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('PtpAdminChecker')
                            .appendText('Статичний клас для перевірки чи є користувач адміном ptp')
                    )
                    .appendChildren(
                        new StepperBlock('PtpAdminCheckerMethods')
                            .appendSteep(
                                new StepBlock('coreOrClient()')
                                    .appendText(
                                        new TextBlock()
                                            .appendText('Перевіряє чи є користувач адміном ptp core або ptp client. Приймає ід користувача та домен(для динамічної бд ptp client).Повертає тип сервісу в якому користувач є адміном(ptp-client або ptp-core). Спочатку перевіряється ptp-core. В разі якщо користувач не адмін викидає помилку з кодом')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'UNAUTHORIZED_ERROR')
                                    )
                            )
                            .appendSteep(
                                new StepBlock('coreOrClientAndDomainIfNotCore()')
                                    .appendText(
                                        new TextBlock()
                                            .appendText('Перевіряє чи є користувач адміном ptp core або ptp client та додатково відповідність домену який було передано в параметрах до домену групи по апі ключам. Повертає ід групи та ід міста групи. В разі якщо не знайдено групи по апі ключам викидає помилку з кодом')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'NOT_FOUND_ERROR')
                                            .appendText('. В разі якщо домен не відповідає домену групи(по ключам) викидає помилку з кодом')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'UNAUTHORIZED_ERROR')
                                            .appendText('. В разі якщо користувач не адмін викидає помилку з кодом')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'UNAUTHORIZED_ERROR')
                                    )
                            )
                    )
                    .appendChildren(
                        new CodeBlock('ptpAdminCheckerExample', 'access/ptpAdminCheckerExample.tse')
                            .setHeaderTitle('Приклад')
                    )
            )
    }
}
