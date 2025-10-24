import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'


type BlockNames = [
    'Validator',
    'SchemaValidator',
]

export class ValidatorDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('Validator', 'cron/CronJob.tse')
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
        )
            .appendBlock(new CodeBlock('SchemaValidator', 'cron/CronJob.tse'))
    }
}

