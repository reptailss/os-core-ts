import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {IDocPage} from '@docPage/interfaces'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {apiServicesDocModule} from '@appDocs/modules/apiServices'
import {envDocModule} from '@appDocs/modules/env'

type BlockNames = [
    'ActionsLoggerService'
]

export class ActionsLoggerServiceDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('ActionsLoggerService', 'logger/ActionsLoggerService.tse')
                .appendText(
                    new TextBlock().setVariant('h6').appendPrimaryText('ActionsLoggerService')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Сервіс для логування CRUD-дій користувача в базі даних. Підтримує створення, оновлення та видалення. Відправляє логи до')
                        .appendLink(apiServicesDocModule.getPageBlockPath('actionsLoggerApiService', 'actionsLoggerApiService'), 'api сервісу actionsLoggerApiService')
                        .appendText('. Для роботи потрібно прописати в енв')
                        .appendLink(envDocModule.getPageBlockPath('env', 'optionalEnvFields'), 'INIT_HAS_SEND_ACTION_SYSTEM_LOGGER')
                        .appendText('=== "1"(якщо поле буде відсутнє або "0" лог не відправиться)')
                        .appendText('та url до самого сервісу')
                        .appendLink(apiServicesDocModule.getPageBlockPath('actionsLoggerApiService', 'actionsLoggerApiService'), 'actionsLoggerApiService')
                        .appendText('в')
                        .appendLink(envDocModule.getPageBlockPath('env', 'apiEnvUrls'), 'INIT_URL_TO_ACTIONS_SYSTEM_LOGGER_SERVICE')
                )
                .appendChildren(
                    new StepperBlock('actionsLoggerServiceMethods')
                        .appendSteep(
                            new StepBlock('logCreateAction')
                                .appendText(
                                    new TextBlock().appendText(
                                        'Логує створення запису. Приймає значення створеного обʼєкта, ID користувача, ID запису та конфігурацію бази даних.'
                                    )
                                )
                                .appendChildren(
                                    new CodeBlock('actionsLoggerServiceLogCreateExample', 'logger/actionsLoggerServiceLogCreateExample.tse')
                                        .setHeaderTitle('Приклад')
                                )
                        )
                        .appendSteep(
                            new StepBlock('logUpdateAction')
                                .appendText(
                                    new TextBlock().appendText(
                                        'Логує зміну запису. Приймає старі й нові значення, ID користувача, ID запису та конфігурацію бази даних.'
                                    )
                                )
                                .appendChildren(
                                    new CodeBlock('actionsLoggerServiceLogUpdateExample', 'logger/actionsLoggerServiceLogUpdateExample.tse')
                                        .setHeaderTitle('Приклад')
                                )
                        )
                        .appendSteep(
                            new StepBlock('logDeleteAction')
                                .appendText(
                                    new TextBlock().appendText(
                                        'Логує видалення запису. Приймає старе значення, ID користувача, ID запису та конфігурацію бази даних.'
                                    )
                                )
                                .appendChildren(
                                    new CodeBlock('actionsLoggerServiceLogDeleteExample', 'logger/actionsLoggerServiceLogDeleteExample.tse')
                                        .setHeaderTitle('Приклад')
                                )
                        )
                )
        )
    }
}
