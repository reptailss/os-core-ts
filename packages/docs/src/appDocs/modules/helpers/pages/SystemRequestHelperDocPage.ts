import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {appErrorDocModule} from '@appDocs/modules/appError'
import {envDocModule} from '@appDocs/modules/env'


type BlockNames = [
    'SystemRequestHelper'
]

export class SystemRequestHelperDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('SystemRequestHelper', 'helpers/SystemRequestHelper.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('SystemRequestHelper')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Статичний клас для здійснення системних між апі-сервісних HTTP запитів. Додає в хедери(authorization) системний токен який бере з')
                        .appendLink(envDocModule.getPageBlockPath('env','requiredEnvFields'),'ENV.INIT_SYSTEM_AUTH_TOKEN')
                        .appendText('. З обробкою помилок, підтримкою параметрів та логування. Якщо сервіс до якого було здійснений запит викине помилку')
                        .appendLinkFromObject(appErrorDocModule.getBlockPathAndTitle('appError', 'AppError'))
                        .appendText('Вона буде прокинула далі поки хтось її не обробить. Приймає додатково ключ сервісу(serviceKey) до якого буде зроблено запит(для відображення в тексті в разі помилки)')
                )
                .appendChildren(
                    new StepperBlock('systemRequestHelperMethods')
                        .appendSteep(
                            new StepBlock('get')
                                .appendText(new TextBlock().appendText('GET-запит на вказаний URL. Підтримує параметри й заголовки.'))
                        )
                        .appendSteep(
                            new StepBlock('post')
                                .appendText(new TextBlock().appendText('POST-запит. Можна передати тіло запиту, заголовки та параметри.'))
                        )
                        .appendSteep(
                            new StepBlock('put')
                                .appendText(new TextBlock().appendText('PUT-запит із можливістю передати тіло, параметри та заголовки.'))
                        )
                        .appendSteep(
                            new StepBlock('delete')
                                .appendText(new TextBlock().appendText('DELETE-запит. Підтримує параметри, тіло та заголовки.'))
                        )
                )
        )
    }
}

