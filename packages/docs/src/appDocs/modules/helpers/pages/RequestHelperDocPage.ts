import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'


type BlockNames = [
    'RequestHelper'
]

export class RequestHelperDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('RequestHelper', 'helpers/RequestHelper.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('RequestHelper')
                )
                .appendText(
                    new TextBlock().appendText(
                        'Статичний клас для здійснення HTTP-запитів з обробкою помилок, підтримкою параметрів та логування.'
                    )
                )
                .appendChildren(
                    new StepperBlock('requestHelperMethods')
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

