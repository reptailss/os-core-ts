import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'
import {apiDecoratorsDocModule} from '@appDocs/modules/decorators/apiDecoratorsDocModule'
import {appResponseDocModule} from '@appDocs/modules/appResponse'

type BlockNames = [
    'requestDecoratorsForMethod',
]

export class RequestsDecoratorsForMethodDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.appendBlock(
            new StepperBlock('requestDecoratorsForMethod')
                .setNavTitle('request decorators for method')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('Request decorators for method')
                )
                .appendText(
                    new TextBlock()
                        .appendText('декоратори для методу контролера. Працює в парі з декораторами')
                        .appendLink(apiDecoratorsDocModule.getPageBlockPath('apiDecorators', 'apiMethodDecorators'), 'api method decorators')
                        .appendText('(без них не буде працювати)')
                )
                .appendSteep(
                    new StepBlock('SetHeaderDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Задає хедер для відповіді на клієнт. Приймає першим параметром ключ по якому буде задано хедер і другим параметром значення.')
                        ).appendChildren(
                        new CodeBlock('setHeaderDecExample', 'decorators/setHeaderDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('AppResponseDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Повертає параметром')
                                .appendLinkFromObject(appResponseDocModule.getBlockPathAndTitle('appResponse', 'AppResponse'))
                                .appendText('. Дозволяє вручну керувати відправкою даних на клієнт методи')
                                .appendLinkFromObject(appResponseDocModule.getBlockPathAndTitle('appResponse', 'AppResponse'))
                        ).appendChildren(
                        new CodeBlock('appResponseDecExample', 'decorators/appResponseDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
        )
        
    }
}

