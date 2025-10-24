import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'
import {apiDecoratorsDocModule} from '@appDocs/modules/decorators/apiDecoratorsDocModule'
import {authDocModule} from '@appDocs/modules/auth'
import {userInfoDocModule} from '@appDocs/modules/userInfo'


type BlockNames = [
    'authDecorators',
]

export class AuthDecoratorsDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init(): void {
        this.appendBlock(
            new StepperBlock('authDecorators')
                .setNavTitle('auth decorators')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('Auth decorators')
                )
                .appendText(
                    new TextBlock()
                        .appendText(' декоратори для перевірки доступу та отримання інформації про юзера')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Навішуються на параметр методу класу')
                        .appendText('Працює в парі з декораторами')
                        .appendLink(apiDecoratorsDocModule.getPageBlockPath('apiDecorators', 'apiMethodDecorators'), 'api method decorators')
                        .appendText('(без них не буде працювати)')
                )
                .appendSteep(
                    new StepBlock('AuthDec')
                        .enableLinkReplacement()
                        .appendText(
                            new TextBlock()
                                .appendText('Перевіряє авторизацію користувача по токену(береться з хедерів поля "authorization") за допомогою')
                                .appendLink(authDocModule.getPageBlockPath('auth', 'AuthService'), 'AuthService.checkTokenAndGetUserInfo')
                                .appendText('та повертає параметром')
                                .appendLinkFromObject(userInfoDocModule.getBlockPathAndTitle('userInfo', 'UserInfo'))
                        ).appendChildren(
                        new CodeBlock('authDecExample', 'decorators/authDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('SystemAuthDec')
                        .enableLinkReplacement()
                        .appendText(
                            new TextBlock()
                                .appendText('Перевіряє авторизацію користувача по системному токену(береться з хедерів поля "authorization") за допомогою')
                                .appendLink(authDocModule.getPageBlockPath('auth', 'AuthService'), 'AuthService.checkSystemTokenAndGetUserInfo')
                                .appendText('та повертає параметром')
                                .appendLinkFromObject(userInfoDocModule.getBlockPathAndTitle('userInfo', 'UserInfo'))
                                .appendText('. Якщо токен не системний викине помилку')
                        )
                        .appendChildren(
                            new CodeBlock('systemAuthDecExample', 'decorators/systemAuthDecExample.tse')
                                .setHeaderTitle('Приклад')
                        )
                )
                .appendSteep(
                    new StepBlock('PtpClientAuthDec')
                        .enableLinkReplacement()
                        .appendText(
                            new TextBlock()
                                .appendText('Перевіряє авторизацію користувача по токену(береться з хедерів поля "authorization") та домену(береться з хедерів поля "domain" | "origin" | "host" | "referer") за допомогою')
                                .appendLink(authDocModule.getPageBlockPath('auth', 'PtpClientAuthService'), 'PtpClientAuthService.checkTokenAndGetUserInfo')
                                .appendText('та повертає параметром')
                                .appendLinkFromObject(userInfoDocModule.getBlockPathAndTitle('userInfo', 'PtpClientUserInfo'))
                                .appendText('Додатково можна передати масивом ролі які повинна бути в користувача. Якщо немає жодної з переданих викине помилку')
                        )
                        .appendChildren(
                            new CodeBlock('ptpClientAuthDecExample', 'decorators/ptpClientAuthDecExample.tse')
                                .setHeaderTitle('Приклад')
                        )
                )
                .appendSteep(
                    new StepBlock('PtpCoreAuthDec')
                        .enableLinkReplacement()
                        .appendText(
                            new TextBlock()
                                .appendText('Перевіряє авторизацію користувача по токену(береться з хедерів поля "authorization") за допомогою')
                                .appendLink(authDocModule.getPageBlockPath('auth', 'PtpCoreAuthService'), 'PtpCoreAuthService.checkTokenAndGetUserInfo')
                                .appendText('та повертає параметром')
                                .appendLinkFromObject(userInfoDocModule.getBlockPathAndTitle('userInfo', 'PtpCoreUserInfo'))
                                .appendText('Додатково можна передати масивом ролі які повинна бути в користувача. Якщо немає жодної з переданих викине помилку')
                        )
                        .appendChildren(
                            new CodeBlock('PtpCoreAuthDec', 'decorators/ptpCoreAuthDecExample.tse')
                                .setHeaderTitle('Приклад')
                        )
                )
        )
    }
}
