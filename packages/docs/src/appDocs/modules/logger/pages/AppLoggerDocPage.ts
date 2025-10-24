import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {IDocPage} from '@docPage/interfaces'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {appDocModule} from '@appDocs/modules/app'


type BlockNames = [
    'appLogger',
]

export class AppLoggerDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('appLogger', 'logger/AppLogger.tse')
                .appendText(new TextBlock().setVariant('h6').appendPrimaryText('appLogger'))
                .appendText(
                    new TextBlock()
                        .appendText('Instance класу')
                        .appendPrimaryText('AppLogger')
                        .appendText('для логування. Пише логи в файли поденно в папці(logs/console) з подальшою можливістю їх отримання. Для роботи при ініціалізації')
                        .appendLink(appDocModule.getPageBlockPath('app', 'IApp'), 'App')
                        .appendText('потрібно викликати метод')
                        .appendLink(appDocModule.getPageBlockPath('app', 'useConsoleLogger'), 'useConsoleLogger')
                        .appendText('Якщо не викликати буде використовуватись простий console.log')
                )
                .appendChildren(
                    new CodeBlock('appLogger', 'logger/appLoggerExample.tse')
                        .setHeaderTitle('Приклад')
                )
        )
    }
}

