import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {IDocPage} from '@docPage/interfaces'


type BlockNames = [
    'apiMethodDecorators',
    'Controller'
]

export class ApiDecoratorsDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.setNavTitle('api decorators')
            .appendBlock(new StepperBlock('Controller')
                .setNavTitle('Controller Dec')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('Controller')
                )
                .appendText(
                    new TextBlock()
                        .appendText('декоратор для обробки http запитів. Навішуються на клас з методами які повинні обробляти запити')
                )
                .appendChildren(
                    new CodeBlock('controllerDecExample', 'decorators/controllerDecExample.tse')
                        .setHeaderTitle('Приклад')
                ))
            .appendBlock(
                new StepperBlock('apiMethodDecorators')
                    .setNavTitle('api method Decorators')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('Api method decorators')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('декоратори для методів обробки http запитів.')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Навішуються на метод класу приймають обовязковий параметр url на запит до якого буде виконаний даний метод.')
                            .appendText('Працює в парі з декоратором')
                            .appendLink(this.getBlock('Controller').getBlockPath(), 'Controller')
                            .appendText('(без нього не буде працювати обробка запитів)')
                    )
                    .appendSteep(
                        new StepBlock('Get')
                            .enableLinkReplacement()
                            .appendText(
                                new TextBlock()
                                    .appendText('Декоратор для оброки GET запитів. Приймає обовязковий параметр url(string)')
                            )
                    )
                    .appendSteep(
                        new StepBlock('Post')
                            .enableLinkReplacement()
                            .appendText(
                                new TextBlock()
                                    .appendText('Декоратор для оброки POST запитів. Приймає обовязковий параметр url(string)')
                            )
                    )
                    .appendSteep(
                        new StepBlock('Put')
                            .enableLinkReplacement()
                            .appendText(
                                new TextBlock()
                                    .appendText('Декоратор для оброки PUT запитів. Приймає обовязковий параметр url(string)')
                            )
                    )
                    .appendSteep(
                        new StepBlock('Delete')
                            .enableLinkReplacement()
                            .appendText(
                                new TextBlock()
                                    .appendText('Декоратор для оброки DELETE запитів. Приймає обовязковий параметр url(string)')
                            )
                    )
                    .appendSteep(
                        new StepBlock('SystemGet')
                            .enableLinkReplacement()
                            .appendText(
                                new TextBlock()
                                    .appendText('Системний декоратор для оброки GET запитів. Додає до url /_inner приставку. Приймає обовязковий параметр url(string)')
                            )
                    )
                    .appendSteep(
                        new StepBlock('SystemPost')
                            .enableLinkReplacement()
                            .appendText(
                                new TextBlock()
                                    .appendText('Системний декоратор для оброки POST запитів. Додає до url /_inner приставку. Приймає обовязковий параметр url(string)')
                            )
                    )
                    .appendSteep(
                        new StepBlock('SystemPut')
                            .enableLinkReplacement()
                            .appendText(
                                new TextBlock()
                                    .appendText('Системний декоратор для оброки PUT запитів. Додає до url /_inner приставку. Приймає обовязковий параметр url(string)')
                            )
                    )
                    .appendSteep(
                        new StepBlock('SystemDelete')
                            .enableLinkReplacement()
                            .appendText(
                                new TextBlock()
                                    .appendText('Системний декоратор для оброки DELETE запитів. Додає до url /_inner приставку. Приймає обовязковий параметр url(string)')
                            )
                    )
                    .appendChildren(
                        new CodeBlock('apiMethodDecoratorsExample', 'decorators/apiMethodDecoratorsExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                    .appendChildren(
                        new CodeBlock('apiMethodDecoratorsExample', 'decorators/apiSystemMethodDecoratorsExample.tse')
                            .setHeaderTitle('Приклад')
                    )
            )
        
        
    }
}
