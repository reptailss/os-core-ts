import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {TableBlock} from '@docBlocks/impl/TableBlock'
import {IDocPage} from '@docPage/interfaces'


type BlockNames = [
    'CronJob',
    'cronTime'
]

export class CronDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('CronJob', 'cron/CronJob.tse')
                .setNavTitle('Cron job')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('CronJob')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Клас для планування періодичних задач з використанням cron-синтаксису.')
                        .appendText('Дозволяє запускати, зупиняти задачі та налаштовувати їх поведінку.')
                )
                .appendChildren(
                    new TableBlock('CronJobConstructorTable')
                        .appendColumn({title: 'Назва', key: 'name'})
                        .appendColumn({title: 'Обов’язкове', key: 'required'})
                        .appendColumn({title: 'Опис', key: 'description'})
                        .appendRows([
                            {
                                name: 'cronTime',
                                required: 'так',
                                description: 'Час запуску задачі у форматі cron, або як обʼєкт Date/DateTime.'
                            },
                            {
                                name: 'onTick',
                                required: 'так',
                                description: 'Функція або команда, яка виконується у заданий час.'
                            },
                            {
                                name: 'onComplete',
                                required: 'ні',
                                description: 'Функція, яка викликається після завершення задачі або при її зупинці.'
                            },
                            {
                                name: 'start',
                                required: 'ні',
                                description: 'Чи запускати задачу автоматично після створення.'
                            },
                            {
                                name: 'timeZone',
                                required: 'ні',
                                description: 'Часовий пояс для виконання задачі.'
                            },
                            {
                                name: 'context',
                                required: 'ні',
                                description: 'Контекст виконання для onTick.'
                            },
                            {
                                name: 'runOnInit',
                                required: 'ні',
                                description: 'Чи виконувати задачу одразу після ініціалізації.'
                            },
                            {
                                name: 'utcOffset',
                                required: 'ні',
                                description: 'Зміщення UTC як альтернатива до timeZone.'
                            },
                            {
                                name: 'unrefTimeout',
                                required: 'ні',
                                description: 'Чи дозволити Node.js завершити процес, навіть якщо задача активна.'
                            }
                        ])
                )
                .appendChildren(
                    new CodeBlock('cronJobExample', 'cron/cronJobExample.tse')
                        .setHeaderTitle('Приклад')
                )
        )
            .appendBlock(
                new CodeBlock('cronTime', 'cron/cronTime.tse')
                    .setNavTitle('cron time')
                    .appendText(
                        new TextBlock().setVariant('h6')
                            .appendPrimaryText('Cron time')
                    )
                    .appendChildren(
                        new TableBlock('cronTimeTable')
                            .appendText(
                                new TextBlock()
                                    .appendText('Приклади')
                            )
                            .appendColumn({title: 'cronTime', key: 'cronTime'})
                            .appendColumn({title: 'Пояснення', key: 'description'})
                            .appendRows([
                                {cronTime: '`* * * * *`', description: 'Щохвилини'},
                                {cronTime: '`*/5 * * * *`', description: 'Кожні 5 хвилин'},
                                {cronTime: '`0 9 * * 1-5`', description: 'О 9:00 з понеділка по пʼятницю'},
                                {cronTime: '`0 0 1 * *`', description: '1-го числа кожного місяця о 00:00'},
                                {cronTime: '`0 12 * * *`', description: 'Щодня опівдні'},
                                {cronTime: '`0 0 * * 0`', description: 'Щонеділі о 00:00'},
                                {cronTime: '`15 14 1 * *`', description: '1-го числа кожного місяця о 14:15'},
                                {cronTime: '`0 22 * * 1-5`', description: 'О 22:00 з понеділка по пʼятницю'},
                                {cronTime: '`0 8 10 * *`', description: 'О 08:00 10-го числа кожного місяця'},
                                {cronTime: '`0 0 * * 6,0`', description: 'Щосуботи і щонеділі о 00:00'},
                                {cronTime: '`30 6 * * 1-5`', description: 'О 6:30 з понеділка по пʼятницю'},
                                {cronTime: '`0 0 1 1 *`', description: 'Щорічно 1 січня о 00:00'},
                                {cronTime: '`0 0 1 7 *`', description: 'Щорічно 1 липня о 00:00'},
                                {cronTime: '`0 0 * * *`', description: 'Щоденно опівночі'},
                                {cronTime: '`0 */2 * * *`', description: 'Кожні 2 години'}
                            ])
                    )
            )
        
    }
}

