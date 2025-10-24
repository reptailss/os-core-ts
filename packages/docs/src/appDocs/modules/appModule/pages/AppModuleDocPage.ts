import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'
import {apiDecoratorsDocModule} from '@appDocs/modules/decorators/apiDecoratorsDocModule'

type BlockNames = [
    'IAppModule',
    'AppModule',
]

export class AppModuleDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init(): void {
        this.appendBlock(
            new CodeBlock('AppModule', 'appModule/appModule.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('Ініціалізація AppModule')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Приймає масив класів(не instance) контролерів з навішеним декоратором')
                        .appendLinkFromObject(apiDecoratorsDocModule.getBlockPathAndTitle('apiDecorators', 'Controller'))
                        .appendText('та методами цього класу з навішеними декораторами типів запитів - ')
                        .appendLink(apiDecoratorsDocModule.getPageBlockPath('apiDecorators', 'apiMethodDecorators'), '( Post, Put, Delete, Get )')
                        .appendText('приймає не обовязковий масив провайдерів які впровадяться на етапі побудові модулів та додаткову інформацію для swagger')
                       
                )
                .setNavTitle('init AppModule')
                .appendChildren(
                    new CodeBlock('appModuleExample', 'appModule/appModuleExample.tse')
                        .setHeaderTitle('Приклад')
                )
        )
        this.appendBlock(
            new CodeBlock('IAppModule', 'appModule/iAppModule.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('IAppModule клас для створення модулю обробки http запитів.')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Містить контролери для обробки запитів з навішеним декоратором')
                        .appendLinkFromObject(apiDecoratorsDocModule.getBlockPathAndTitle('apiDecorators', 'Controller'))
                        .appendText('та методами цього класу з навішеними декораторами типів запитів')
                        .appendLink(apiDecoratorsDocModule.getPageBlockPath('apiDecorators', 'apiMethodDecorators'), '(Post,Put,Delete,Get)')
                        .appendText('(без них не буде працювати обробка запитів).та додаткову інформацію для swagger або масив інших таких же модулів. Може впровадити залежності через метод overrideProvider. Викликати потрібно до побудови всіх модулів(')
                        .appendCodeLink('{{App}}')
                        .appendText('.initModules())')
                )
                .setNavTitle('App module')
        )
    }
}
