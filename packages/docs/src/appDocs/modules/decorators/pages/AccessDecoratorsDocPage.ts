import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'
import {accessDocModule} from '@appDocs/modules/access'
import {userInfoDocModule} from '@appDocs/modules/userInfo'
import {apiDecoratorsDocModule} from '@appDocs/modules/decorators/apiDecoratorsDocModule'

type BlockNames = [
    'accessDecorators',
]

export class AccessDecoratorsDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.appendBlock(
            new StepperBlock('accessDecorators')
                .setNavTitle('access decorators')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('Access decorators')
                )
                .appendText(
                    new TextBlock()
                        .appendText('декоратори для перевірки доступу та отримання інформації про юзера')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Навішуються на параметр методу класу')
                        .appendText('Працює в парі з декораторами')
                        .appendLink(apiDecoratorsDocModule.getPageBlockPath('apiDecorators', 'apiMethodDecorators'), 'api method decorators')
                        .appendText('(без них не буде працювати)')
                )
                .appendSteep(
                    new StepBlock('DashboardAccessDec')
                        .enableLinkReplacement()
                        .appendText(
                            new TextBlock()
                                .appendText('Перевіряє чи є користувач адміном дашборду по токену(береться з хедерів поля "authorization")  за допомогою')
                                .appendLink(accessDocModule.getPageBlockPath('access', 'DashboardAccessService'), 'DashboardAccessService.checkAccessByToken')
                                .appendText('та повертає параметром')
                                .appendLink(userInfoDocModule.getPageBlockPath('userInfo', 'FullUserInfo'), 'FullUserInfo')
                        ).appendChildren(
                        new CodeBlock('dashboardAccessDecExample', 'decorators/dashboardAccessDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
        )
    }
}

