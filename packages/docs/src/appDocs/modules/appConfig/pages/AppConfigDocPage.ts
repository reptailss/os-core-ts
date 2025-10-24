import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {envDocModule} from '@appDocs/modules/env'

type BlockNames = [
    'OsCoreAppConfig',
]

export class AppConfigDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.appendBlock(
            new StepperBlock('OsCoreAppConfig')
                .setNavTitle('OsCoreAppConfig')
                .appendText(
                    new TextBlock().appendText('Статичний клас для отримання конфігу')
                )
                .appendSteep(
                    new StepBlock('getServiceKey():string')
                        .appendText(
                            new TextBlock()
                                .appendText('Повертає унікальний ключ для сервісу який задається через')
                                .appendLink(envDocModule.getPageBlockPath('env', 'requiredEnvFields'), 'ENV.INIT_SERVICE_KEY')
                        )
                )
                .appendSteep(
                    new StepBlock('getServicePrefix():string | null')
                        .appendText(
                            new TextBlock()
                                .appendText('Повертає префікс сервісу або null')
                                .appendLink(envDocModule.getPageBlockPath('env', 'requiredEnvFields'), 'ENV.INIT_SERVICE_PREFIX')
                        )
                )
        )
        
    }
}
