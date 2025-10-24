import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TableBlock} from '@docBlocks/impl/TableBlock'
import {IDocPage} from '@docPage/interfaces'
import {envDocModule} from '@appDocs/modules/env'


type BlockNames = [
    'ClientPackagesHtmlBuilder',
]

export class ClientPackagesDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init() {
        this.appendBlock(
            new CodeBlock('ClientPackagesHtmlBuilder', 'clientPackages/ClientPackagesHtmlBuilder.tse')
                .setNavTitle('Html builder')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('ClientPackagesHtmlBuilder')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Клас для модифікації HTML-файлу клієнтського пакета.Дозволяє додати префікс сервісу до скриптів і favicon а також додати ключ сервісу до заголовка сторінки.')
                )
                .appendChildren(
                    new TableBlock('ClientPackagesHtmlBuilderTable')
                        .appendColumn({title: 'Метод', key: 'method'})
                        .appendColumn({title: 'Опис', key: 'description'})
                        .appendRows([
                            {
                                method: 'addServicePrefixToScriptsBundle',
                                description: new TextBlock()
                                    .appendText('Додає префікс сервісу до шляхів `<script src>` і `<link rel="icon">` в HTML з')
                                    .appendLink(envDocModule.getPageBlockPath('env', 'requiredEnvFields'), 'ENV.INIT_SERVICE_PREFIX')
                            },
                            {
                                method: 'addServiceNameToTitle',
                                description: 'Додає назву сервісу (`serviceKey`) у тег `<title>`, якщо він заданий.'
                            },
                            {
                                method: 'getHtml',
                                description: 'Повертає фінальний HTML як рядок.'
                            }
                        ])
                )
                .appendChildren(
                    new CodeBlock('clientPackagesHtmlBuilderTemplateExample', 'clientPackages/clientPackagesHtmlBuilderTemplateExample.tse')
                        .setHeaderTitle('Приклад шаблону')
                        .appendText(
                            new TextBlock()
                                .appendText('Html на вході повинен відповідати певному шаблону. Href для favicon повинен бути -')
                                .appendPrimaryText('"`packageName`/favicon.icon"')
                                .appendText(', src для bundle повинен бути')
                                .appendPrimaryText('"/`packageName`/main.js"')
                        )
                )
                .appendChildren(
                    new CodeBlock('clientPackagesHtmlBuilderExample', 'clientPackages/clientPackagesHtmlBuilderExample.tse')
                        .setHeaderTitle('Приклад')
                )
        )
    }
}
