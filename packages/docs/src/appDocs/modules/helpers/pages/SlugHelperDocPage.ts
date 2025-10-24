import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'


type BlockNames = [
    'SlugHelper'
]

export class SlugHelperDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('SlugHelper', 'helpers/SlugHelper.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('SlugHelper')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Статичний клас для генерування слагу')
                )
                .appendChildren(
                    new StepperBlock('slugHelperMethods')
                        .appendSteep(
                            new StepBlock('generateSlug')
                                .appendText(
                                    new TextBlock().appendText('Генерує слаг. Додатково приймає не обовязковий параметр spaceReplacement - символ яким потрібно замінити пробіли')
                                )
                        )
                )
        )
    }
}

