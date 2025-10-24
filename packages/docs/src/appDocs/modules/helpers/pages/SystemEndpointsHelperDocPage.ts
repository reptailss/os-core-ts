import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'


type BlockNames = [
    'SystemEndpointsHelper'
]

export class SystemEndpointsHelperDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('SystemEndpointsHelper', 'helpers/SystemEndpointsHelper.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('SystemEndpointsHelper')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Статичний клас роботи з системними ендпоінтами')
                )
                .appendChildren(
                    new StepperBlock('systemEndpointsHelperMethods')
                        .appendSteep(
                            new StepBlock('buildSystemEndpointUrl')
                                .appendText(
                                    new TextBlock().appendText('Генерує системний url, додає на початок до переданого url приставку "/_inner"')
                                )
                        )
                )
        )
    }
}

