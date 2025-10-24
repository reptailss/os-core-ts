import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {IDocPage} from '@docPage/interfaces'
import {apiDecoratorsDocModule} from '@appDocs/modules/decorators/apiDecoratorsDocModule'
import {validatorDocModule} from '@appDocs/modules/validator'
import {appErrorDocModule} from '@appDocs/modules/appError'
import {filesDocModule} from '@appDocs/modules/files'
import {TableBlock} from '@docBlocks/impl/TableBlock'

type BlockNames = [
    'requestDecoratorsForParamsMethod',
]

export class RequestDecoratorsForParamsMethodDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.appendBlock(
            new StepperBlock('requestDecoratorsForParamsMethod')
                .setNavTitle('requests decorators for params method')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('Requests decorators')
                )
                .appendText(
                    new TextBlock()
                        .appendText('декоратори для отримання даних з клієнту')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Навішуються на параметр методу класу')
                        .appendText('Працює в парі з декораторами')
                        .appendLink(apiDecoratorsDocModule.getPageBlockPath('apiDecorators', 'apiMethodDecorators'), 'api method decorators')
                        .appendText('(без них не буде працювати)')
                )
                .appendSteep(
                    new StepBlock('BodyDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує body з клієнта')
                                .appendText('приймає обовязковий параметр схеми валідації')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('якщо валідація пройдена успішно повертає параметром дані відповідно до схеми. В іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                                .appendText('Додатково клієнт повинен встановити хедер "Content-type":"application/json"')
                        ).appendChildren(
                        new CodeBlock('bodyDecExample', 'decorators/bodyDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('FormDataDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує formData з клієнта та конвертує її в звичайний обєкт,')
                                .appendText('приймає обовязковий параметр схеми валідації')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('якщо валідація пройдена успішно повертає параметром дані відповідно до схеми. В іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                                .appendText('Додатково клієнт повинен встановити хедер "Content-type":"multipart/form-data"')
                        ).appendChildren(
                        new CodeBlock('formDataDecExample', 'decorators/formDataDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('ParamDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує string або можливий undefined(відповідно до схеми якщо викликано в схемі метод .optional() ) з url(потрібно вказати цей ключ в url) по вказаному ключу в переданому параметрі')
                                .appendText('приймає обовязковий параметр ключа та не обовязковий параметр схеми валідації')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('(повинна відповідати string)')
                                .appendText('якщо валідація пройдена успішно повертає параметром дані відповідно до схеми(якщо не передана схема буде string) В іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                        ).appendChildren(
                        new CodeBlock('paramDecExample', 'decorators/paramDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('ParamOptionalDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Являється точною копією')
                                .appendPrimaryText('ParamDec')
                                .appendText('. За винятком того що по дефолту схема є string або undefined. І відповідно якщо не передати схеми другим параметром буде повернуто string | undefined')
                        ).appendChildren(
                        new CodeBlock('paramOptionalDecExample', 'decorators/paramOptionalDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('ParamNumDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує number або можливий undefined(відповідно до схеми якщо викликано в схемі метод .optional() ) з url(потрібно вказати цей ключ в url) по вказаному ключу в переданому параметрі')
                                .appendText('приймає обовязковий параметр ключа та не обовязковий параметр схеми валідації')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('(повинна відповідати number)')
                                .appendText('якщо валідація пройдена успішно повертає параметром дані відповідно до схеми(якщо не передана схема буде number) В іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                        ).appendChildren(
                        new CodeBlock('paramNumDecExample', 'decorators/paramNumDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('ParamNumOptionalDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Являється точною копією')
                                .appendPrimaryText('ParamNumDec')
                                .appendText('. За винятком того що по дефолту схема є number або undefined. І відповідно якщо не передати схеми другим параметром буде повернуто number | undefined')
                        ).appendChildren(
                        new CodeBlock('paramNumOptionalDecExample', 'decorators/paramNumOptionalDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('QueryParamDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує string або можливий undefined(відповідно до схеми якщо викликано в схемі метод .optional() ) з query параметрів по вказаному ключу в переданому параметрі')
                                .appendText('приймає обовязковий параметр ключа та не обовязковий параметр схеми валідації')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('(повинна відповідати string)')
                                .appendText('якщо валідація пройдена успішно повертає параметром дані відповідно до схеми(якщо не передана схема буде string) В іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                        ).appendChildren(
                        new CodeBlock('queryParamDecExample', 'decorators/queryParamDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('QueryParamOptionalDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Являється точною копією')
                                .appendPrimaryText('QueryParamDec')
                                .appendText('. За винятком того що по дефолту схема є string або undefined. І відповідно якщо не передати схеми другим параметром буде повернуто string | undefined')
                        ).appendChildren(
                        new CodeBlock('queryParamOptionalDecExample', 'decorators/queryParamOptionalDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('QueryParamNumDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує number або можливий undefined(відповідно до схеми якщо викликано в схемі метод .optional() ) з з query параметрів по вказаному ключу в переданому параметрі')
                                .appendText('приймає обовязковий параметр ключа та не обовязковий параметр схеми валідації')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('(повинна відповідати number)')
                                .appendText('якщо валідація пройдена успішно повертає параметром дані відповідно до схеми(якщо не передана схема буде number) В іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                        ).appendChildren(
                        new CodeBlock('queryParamNumDecExample', 'decorators/queryParamNumDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('QueryParamNumOptionalDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Являється точною копією')
                                .appendPrimaryText('QueryParamNumDec')
                                .appendText('. За винятком того що по дефолту схема є number або undefined. І відповідно якщо не передати схеми другим параметром буде повернуто number | undefined')
                        ).appendChildren(
                        new CodeBlock('queryParamNumOptionalDecExample', 'decorators/queryParamNumOptionalDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('QueryParamDateDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує Date або можливий undefined(відповідно до схеми якщо викликано в схемі метод .optional() ) з з query параметрів по вказаному ключу в переданому параметрі')
                                .appendText('приймає обовязковий параметр ключа та не обовязковий параметр схеми валідації')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('(повинна відповідати Date)')
                                .appendText('якщо валідація пройдена успішно повертає параметром дані відповідно до схеми(якщо не передана схема буде Date) В іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                        ).appendChildren(
                        new CodeBlock('queryParamDateDecExample', 'decorators/queryParamDateDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('QueryParamDateOptionalDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Являється точною копією')
                                .appendPrimaryText('QueryParamNumDec')
                                .appendText('. За винятком того що по дефолту схема є Date або undefined. І відповідно якщо не передати схеми другим параметром буде повернуто Date | undefined')
                        ).appendChildren(
                        new CodeBlock('queryParamDateOptionalDecExample', 'decorators/queryParamDateOptionalDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('QueryParamsDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує обєкт або undefined(відповідно до схеми якщо викликано в схемі метод .optional() ) з з query параметрів')
                                .appendText('приймає обовязковий параметр схеми валідації')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('(повинна відповідати object)')
                                .appendText('якщо валідація пройдена успішно повертає параметром дані відповідно до схеми. В іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                        ).appendChildren(
                        new CodeBlock('queryParamsDecExample', 'decorators/queryParamsDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('HeaderDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує string або  можливий undefined(відповідно до схеми якщо викликано в схемі метод .optional() ) з хедерів по вказаному ключу в переданому параметрі')
                                .appendText('приймає обовязковий параметр ключа та не обовязковий параметр схеми валідації')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('(повинна відповідати string)')
                                .appendText('якщо валідація пройдена успішно повертає параметром дані відповідно до схеми(якщо не передана схема буде string) В іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                        ).appendChildren(
                        new CodeBlock('headerDecExample', 'decorators/headerDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('HeaderOptionalDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Являється точною копією')
                                .appendPrimaryText('HeaderDec')
                                .appendText('. За винятком того що по дефолту схема є string або undefined. І відповідно якщо не передати схеми другим параметром буде повернуто string | undefined')
                        ).appendChildren(
                        new CodeBlock('headerOptionalDecExample', 'decorators/headerOptionalDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('HeadersDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує обєкт або undefined(відповідно до схеми якщо викликано в схемі метод .optional() ) з з query параметрів')
                                .appendText('приймає не обовязковий параметр схеми валідації(якщо не передати валідації не буде і буде повернуто обєкт з чим завгодно(unknown)) ')
                                .appendLinkFromObject(validatorDocModule.getBlockPathAndTitle('validator', 'SchemaValidator'))
                                .appendText('(повинна відповідати Record<string,string | undefined>)')
                                .appendText('якщо валідація передана і пройдена успішно повертає параметром дані відповідно до схеми в іншому випадку викидає помилку')
                                .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                        ).appendChildren(
                        new CodeBlock('headersDecExample', 'decorators/headersDecExample.tse')
                            .setHeaderTitle('Приклад')
                    )
                )
                .appendSteep(
                    new StepBlock('AppFileDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує')
                                .appendLinkFromObject(filesDocModule.getBlockPathAndTitle('files', 'AppFile'))
                                .appendText('приймає не обовяковий обєкт з опціями:')
                        )
                        .appendChildren(
                            new TableBlock('appFileDecParametersTable')
                                .appendColumn({
                                    key: 'key',
                                    title: 'Ключ'
                                })
                                .appendColumn({
                                    key: 'type',
                                    title: 'Тип'
                                })
                                .appendColumn({
                                    key: 'defaultValue',
                                    title: 'За замовчуванням'
                                })
                                .appendColumn({
                                    key: 'description',
                                    title: 'Опис'
                                })
                                .appendRows([
                                    {
                                        key: 'fileKey',
                                        type: 'string',
                                        description: 'Ключ по якому клієнт буде відправляти файл',
                                        defaultValue: '"files"'
                                    },
                                    {
                                        key: 'required',
                                        type: 'boolean',
                                        description: new TextBlock()
                                            .appendText('Чи обовязковий файл(якщо так і файл не відправлено викине помилку')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                                            .appendText('). Якщо ні то передасть null в параметр'),
                                        defaultValue: ''
                                    },
                                    {
                                        key: 'formats',
                                        type: new TextBlock().appendLink(filesDocModule.getPageBlockPath('files', 'mimetype'), 'mimetype[]'),
                                        description: new TextBlock()
                                            .appendText('Масив mimetype форматів файлів для валідації. Якщо не передати пропустить будь який формат. Якщо не підходить жодний формат викине помилку')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR'),
                                        defaultValue: ''
                                    }
                                ])
                        )
                        .appendChildren(
                            new CodeBlock('appFileDecExample', 'decorators/appFileDecExample.tse')
                                .setHeaderTitle('Приклад')
                        )
                )
                .appendSteep(
                    new StepBlock('AppFilesDec')
                        .enableLinkReplacement()
                        .showInNavigation()
                        .appendText(
                            new TextBlock()
                                .appendText('Отримує масив')
                                .appendLinkFromObject(filesDocModule.getBlockPathAndTitle('files', 'AppFile'))
                                .appendText('приймає не обовяковий обєкт з опціями:')
                        )
                        .appendChildren(
                            new TableBlock('appFileDecParametersTable')
                                .appendColumn({
                                    key: 'key',
                                    title: 'Ключ'
                                })
                                .appendColumn({
                                    key: 'type',
                                    title: 'Тип'
                                })
                                .appendColumn({
                                    key: 'defaultValue',
                                    title: 'За замовчуванням'
                                })
                                .appendColumn({
                                    key: 'description',
                                    title: 'Опис'
                                })
                                .appendRows([
                                    {
                                        key: 'fileKey',
                                        type: 'string',
                                        description: 'Ключ по якому клієнт буде відправляти файл',
                                        defaultValue: '"file"'
                                    },
                                    {
                                        key: 'minCount',
                                        type: 'number',
                                        description: new TextBlock()
                                            .appendText('Мінімальна кількість файлів(якщо є і файлів менше викине помилку')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                                            .appendText(')'),
                                        defaultValue: ''
                                    },
                                    {
                                        key: 'maxCount',
                                        type: 'number',
                                        description: new TextBlock()
                                            .appendText('Максимальна кількість файлів(якщо є і файлів більше викине помилку')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR')
                                            .appendText(')'),
                                        defaultValue: ''
                                    },
                                    {
                                        key: 'formats',
                                        type: new TextBlock().appendLink(filesDocModule.getPageBlockPath('files', 'mimetype'), 'mimetype[]'),
                                        description: new TextBlock()
                                            .appendText('Масив mimetype форматів файлів для валідації. Якщо не передати пропустить будь який формат. Якщо не підходить жодний формат викине помилку')
                                            .appendLink(appErrorDocModule.getPageBlockPath('appError', 'AppErrorKey'), 'VALIDATION_ERROR'),
                                        defaultValue: ''
                                    }
                                ])
                        )
                        .appendChildren(
                            new CodeBlock('appFilesDecExample', 'decorators/appFilesDecExample.tse')
                                .setHeaderTitle('Приклад')
                        )
                )
        )
        
    }
}

