import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {TableBlock} from '@docBlocks/impl/TableBlock'
import {IDocPage} from '@docPage/interfaces'


type BlockNames = [
    'AppResponse'
]

export class AppResponseDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init(): void {
        this.appendBlock(
            new CodeBlock('AppResponse', 'appResponse/AppResponse.tse')
                .setNavTitle('App response')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('AppResponse')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Інтерфейс, що розширює стандартний http.ServerResponse і надає додаткові методи для зручної роботи з HTTP-відповідями.')
                        .appendPrimaryText('http.ServerResponse')
                        .appendText('і надає додаткові методи для зручної роботи з HTTP-відповідями.')
                )
                .appendChildren(
                    new TableBlock('appResponseTable')
                        .appendColumn({title: 'Метод / Властивість', key: 'method'})
                        .appendColumn({title: 'Опис', key: 'description'})
                        .appendRows([
                            {
                                method: 'send',
                                description: 'Надсилає відповідь з тілом (JSON, обʼєкт, рядок тощо).'
                            },
                            {
                                method: 'sendFile',
                                description: 'Надсилає файл. Обробляє помилки через callback.'
                            },
                            {
                                method: 'sendFile',
                                description: 'Надсилає файл з опціями. Обробник помилки — третім аргументом.'
                            },
                            {
                                method: 'status',
                                description: 'Встановлює HTTP статус-код відповіді.'
                            },
                            {
                                method: 'sendStatus',
                                description: 'Встановлює статус-код та надсилає відповідь з описом.'
                            },
                            {
                                method: 'contentType',
                                description: 'Встановлює заголовок Content-Type.'
                            },
                            {
                                method: 'cookie',
                                description: 'Встановлює cookie в заголовки відповіді.'
                            },
                            {
                                method: 'redirect',
                                description: 'Виконує редирект на вказаний URL з кодом 302.'
                            },
                            {
                                method: 'redirect',
                                description: 'Виконує редирект із зазначеним статусом.'
                            },
                            {
                                method: '_body',
                                description: 'Тіло відповіді (використовується всередині фреймворку для логування).'
                            },
                            {
                                method: 'locals',
                                description: 'Локальні змінні відповіді (зберігаються протягом запиту використовується всередині фреймворку).'
                            }
                        ])
                )
        )
        
    }
}
