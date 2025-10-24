import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'

type BlockNames = [
    'StringCaseHelper'
]

export class StringCaseHelperDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init() {
        this.appendBlock(
            new CodeBlock('StringCaseHelper', 'helpers/StringCaseHelper.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('StringCaseHelper')
                )
                .appendText(
                    new TextBlock().appendText(
                        'Статичний клас для перетворення рядків у різні стилі форматування: camelCase, PascalCase, snake_case, SNAKE_UPPER_CASE та kebab-case.'
                    )
                )
                .appendChildren(
                    new StepperBlock('stringCaseHelperMethods')
                        .appendSteep(
                            new StepBlock('toCamelCase')
                                .appendText(
                                    new TextBlock().appendText(
                                        'Перетворює рядок у camelCase. Наприклад: "some value-here" → "someValueHere".'
                                    )
                                )
                        )
                        .appendSteep(
                            new StepBlock('toPascalCase')
                                .appendText(
                                    new TextBlock().appendText(
                                        'Перетворює рядок у PascalCase. Наприклад: "some value-here" → "SomeValueHere".'
                                    )
                                )
                        )
                        .appendSteep(
                            new StepBlock('toSnakeCase')
                                .appendText(
                                    new TextBlock().appendText(
                                        'Перетворює рядок у snake_case. Наприклад: "someValueHere" → "some_value_here".'
                                    )
                                )
                        )
                        .appendSteep(
                            new StepBlock('toSnakeUpperCase')
                                .appendText(
                                    new TextBlock().appendText(
                                        'Перетворює рядок у SNAKE_UPPER_CASE. Наприклад: "someValueHere" → "SOME_VALUE_HERE".'
                                    )
                                )
                        )
                        .appendSteep(
                            new StepBlock('toKebabCase')
                                .appendText(
                                    new TextBlock().appendText(
                                        'Перетворює рядок у kebab-case. Наприклад: "someValueHere" → "some-value-here".'
                                    )
                                )
                        )
                )
        )
    }
}
