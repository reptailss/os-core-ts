import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'


type BlockNames = [
    'DateHelper'
]

export class DateHelperDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('DateHelper', 'helpers/DateHelper.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('DateHelper')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Статичний клас для роботи з датами')
                )
                .appendChildren(
                    new StepperBlock('dateHelperMethods')
                        .appendSteep(
                            new StepBlock('getCurrentMonth')
                                .appendText(
                                    new TextBlock().appendText('Повертає поточний місяць (1–12)')
                                )
                        )
                        .appendSteep(
                            new StepBlock('getCurrentYear')
                                .appendText(
                                    new TextBlock().appendText('Повертає поточний рік')
                                )
                        )
                        .appendSteep(
                            new StepBlock('getMonthAndYearFromDate')
                                .appendText(
                                    new TextBlock().appendText('Повертає місяць і рік з дати')
                                )
                        )
                        .appendSteep(
                            new StepBlock('generateDateIntervalsYearAndMonthByRange')
                                .appendText(
                                    new TextBlock().appendText('Генерує масив інтервалів по місяцях і роках у заданому діапазоні')
                                )
                        )
                        .appendSteep(
                            new StepBlock('generateDateIntervalsByDayRange')
                                .appendText(
                                    new TextBlock().appendText('Генерує масив інтервалів по днях у заданому діапазоні')
                                )
                        )
                        .appendSteep(
                            new StepBlock('getDateFormat')
                                .appendText(
                                    new TextBlock().appendText('Форматує дату відповідно до заданого шаблону')
                                )
                        )
                        .appendSteep(
                            new StepBlock('isDateInFuture')
                                .appendText(
                                    new TextBlock().appendText('Перевіряє, чи є дата в майбутньому')
                                )
                        )
                        .appendSteep(
                            new StepBlock('isDateInPast')
                                .appendText(
                                    new TextBlock().appendText('Перевіряє, чи є дата в минулому')
                                )
                        )
                )
        )
    }
}

