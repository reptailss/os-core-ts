import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {IDocPage} from '@docPage/interfaces'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'


type BlockNames = [
    'RedisDynamicService',
]

export class DynamicRedisDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.appendBlock(
            new CodeBlock('RedisDynamicService', 'redis/RedisDynamicService.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('RedisDynamicService')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Клас для взаємодії з динамічним Redis-клієнтом (тобто створеним під час виконання, залежно від конфігурації).')
                )
                .appendChildren(
                    new StepperBlock('redisDynamicServiceMethods')
                        .appendSteep(
                            new StepBlock('setValue')
                                .appendText(
                                    new TextBlock()
                                        .appendText('зберігає строкове значення за заданим ключем у Redis.')
                                )
                        )
                        .appendSteep(
                            new StepBlock('getValue')
                                .appendText(
                                    new TextBlock()
                                        .appendText('повертає строкове значення за ключем або null, якщо не існує.')
                                )
                        )
                        .appendSteep(
                            new StepBlock('deleteValue')
                                .appendText(
                                    new TextBlock()
                                        .appendText('видаляє ключ із Redis. Повертає кількість видалених ключів (0 або 1).')
                                )
                        )
                        .appendSteep(
                            new StepBlock('setMapValue')
                                .appendText(
                                    new TextBlock()
                                        .appendText('зберігає обʼєкт як хеш у Redis. Кожен ключ у обʼєкті стає полем у Redis hash.')
                                )
                        )
                        .appendSteep(
                            new StepBlock('getMapValue')
                                .appendText(
                                    new TextBlock()
                                        .appendText('повертає весь hash обʼєкт за ключем або порожній обʼєкт, якщо ключ відсутній.')
                                )
                        )
                        .appendSteep(
                            new StepBlock('getMapValueByFieldKey')
                                .appendText(
                                    new TextBlock()
                                        .appendText('повертає значення окремого поля з Redis hash.')
                                )
                        )
                        .appendSteep(
                            new StepBlock('deleteMapValue')
                                .appendText(
                                    new TextBlock()
                                        .appendText('видаляє окреме поле з Redis hash.')
                                )
                        )
                        .appendSteep(
                            new StepBlock('checkConnection')
                                .appendText(
                                    new TextBlock()
                                        .appendText('перевіряє зʼєднання з Redis, викликаючи команду PING. Повертає true або false.')
                                )
                        )
                        .appendSteep(
                            new StepBlock('getClient')
                                .appendText(
                                    new TextBlock()
                                        .appendText('повертає поточний динамічний Redis-клієнт. Може використовуватись для виконання власних команд.')
                                )
                        )
                )
                .appendChildren(
                    new CodeBlock('redisDynamicServiceExample', 'redis/redisDynamicServiceExample.tse')
                        .setHeaderTitle('Приклад')
                )
        )
    }
}


