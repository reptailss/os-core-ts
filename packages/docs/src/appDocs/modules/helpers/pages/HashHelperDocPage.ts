import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'


type BlockNames = [
    'HashHelper'
]

export class HashHelperDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('HashHelper', 'helpers/HashHelper.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('HashHelper')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Статичний клас для створення гешів')
                )
                .appendChildren(
                    new StepperBlock('hashHelperMethods')
                        .appendSteep(
                            new StepBlock('generateHash')
                                .appendText(
                                    new TextBlock().appendText('Генерує MD5-геш зі стрічки, масиву чисел або Buffer')
                                )
                        )
                )
        )
    }
}

