import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {TableBlock} from '@docBlocks/impl/TableBlock'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {IDocPage} from '@docPage/interfaces'
import {domainDocModule} from '@appDocs/modules/domain'
import {envDocModule} from '@appDocs/modules/env'
import {redisDocModule} from '@appDocs/modules/redis'


type BlockNames = ['IDbConnectionSql',
    'DbConnectionSqlFactory',
    'SqlMigrations',
    'ISqlMigrationTaskFactory',
]

export class SqlDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    public init(): void {
        this.appendBlock(
            new CodeBlock('IDbConnectionSql', 'db/IDbConnectionSql.tse')
                .setHeaderTitle('dbConnection')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('IDbConnectionSql')
                )
                .appendText(
                    new TextBlock()
                        .appendText('описує зʼєднання з SQL-базою даних, яке включає методи для створення моделей, виконання запитів та керування таблицями.')
                )
                .appendChildren(
                    new TableBlock('IDbConnectionSqlTable')
                        .appendColumn({
                            title: 'Метод',
                            key: 'method'
                        })
                        .appendColumn({
                            title: 'Опис',
                            key: 'description'
                        })
                        .appendRows([
                            {
                                method: 'defineModel',
                                description: 'Створює SQL-модель з колонками, звʼязками та індексами'
                            },
                            {method: 'query', description: 'Виконує raw SQL-запит та повертає результат'},
                            {method: 'tableExists', description: 'Перевіряє існування таблиці'},
                            {method: 'getColumnsTable', description: 'Повертає колонки вказаної таблиці'},
                            {method: 'addColumn', description: 'Додає нову колонку до таблиці'},
                            {method: 'changeColumn', description: 'Змінює властивості існуючої колонки'},
                            {method: 'removeColumn', description: 'Видаляє колонку з таблиці'},
                            {method: 'renameColumn', description: 'Перейменовує колонку'},
                            {method: 'createTable', description: 'Створює нову таблицю з колонками'},
                            {method: 'dropTable', description: 'Видаляє таблицю з бази даних'},
                            {
                                method: 'syncModels',
                                description: 'Синхронізує моделі з базою даних. Створює таблиці яких ще не існує.'
                            },
                            {method: 'checkConnection', description: 'Перевіряє підключення до бази'},
                            {method: 'close', description: 'Закриває зʼєднання з базою даних'}
                        ])
                )
        )
            .appendBlock(
                new CodeBlock('DbConnectionSqlFactory', 'db/DbConnectionSqlFactory.tse')
                    .setHeaderTitle('Db connection sql Factory')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('DbConnectionSqlFactory')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Статичний клас для створення зʼєднання з SQL-базою даних. Доступні як динамічні, так і статичні методи ініціалізації зʼєднання.')
                    )
                    .appendChildren(
                        new StepperBlock('getStatic')
                            .appendSteep(
                                new StepBlock('getStatic')
                                    .appendText(
                                        new TextBlock()
                                            .setVariant('body1')
                                            .appendText('Створює та повертає')
                                            .appendLink(this.getBlockPath('IDbConnectionSql'), 'підключення до бази даних')
                                            .appendText('. Бере конфігурації з')
                                            .appendLink(envDocModule.getPageBlockPath('env', 'requiredEnvFields'), 'ENV')
                                    )
                                    .appendChildren(
                                        new TableBlock('getDynamicByDomainEnv')
                                            .appendColumn({key: 'key', title: 'Environment variable'})
                                            .appendColumn({key: 'defaultValue', title: 'Дефолтне значення'})
                                            .appendColumn({key: 'description', title: 'Опис'})
                                            .appendRows([
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_DATABASE',
                                                    description: 'Назва статичної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_HOST',
                                                    description: 'Хост статичної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_PORT',
                                                    description: 'Порт статичної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_USERNAME',
                                                    description: 'Ім\'я користувача для статичної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_PASSWORD',
                                                    description: 'Пароль для статичної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_DIALECT',
                                                    defaultValue: 'mysql',
                                                    description: 'Діалект статичної SQL бази даних (mysql, mariadb)'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_ENCODING',
                                                    defaultValue: 'utf8',
                                                    description: 'Кодування статичної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_TIMEZONE',
                                                    defaultValue: '+00:00',
                                                    description: 'Часовий пояс для статичної SQL бази даних'
                                                }
                                            ])
                                    )
                                    .appendChildren(
                                        new CodeBlock('getStaticExample', 'db/getStaticExample.tse')
                                            .setHeaderTitle('Приклад')
                                    )
                            )
                            .appendSteep(
                                new StepBlock('getDynamicByDomain')
                                    .appendText(
                                        new TextBlock()
                                            .appendText('Асинхронно створює підключення до бази даних на основі домену. Бере назву бд з ')
                                            .appendLink(domainDocModule.getPageBlockPath('domain', 'DomainService'), 'DomainService.getDatabaseNameByDomain')
                                            .appendText('який в свою чергу з')
                                            .appendLinkFromObject(redisDocModule.getBlockPathAndTitle('dynamicRedis', 'RedisDynamicService'))
                                            .appendText('(потрібно вказати додатково ENV поля для нього) по домену решту конфігурації тягне з')
                                            .appendLink(envDocModule.getPageBlockPath('env', 'requiredEnvFields'), 'ENV')
                                    )
                                    .appendChildren(
                                        new TableBlock('getDynamicByDomainEnv')
                                            .appendColumn({key: 'key', title: 'Environment variable'})
                                            .appendColumn({key: 'defaultValue', title: 'Дефолтне значення'})
                                            .appendColumn({key: 'description', title: 'Опис'})
                                            .appendRows([
                                                {
                                                    key: 'INIT_SQL_DYNAMIC_DB_HOST',
                                                    description: 'Хост динамічної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_DYNAMIC_DB_PORT',
                                                    description: 'Порт динамічної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_DYNAMIC_DB_USERNAME',
                                                    description: 'Ім\'я користувача для динамічної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_DYNAMIC_DB_PASSWORD',
                                                    description: 'Пароль для динамічної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_DIALECT',
                                                    defaultValue: 'mysql',
                                                    description: 'Діалект статичної SQL бази даних (mysql, mariadb)'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_ENCODING',
                                                    defaultValue: 'utf8',
                                                    description: 'Кодування статичної SQL бази даних'
                                                },
                                                {
                                                    key: 'INIT_SQL_STATIC_DB_TIMEZONE',
                                                    defaultValue: '+00:00',
                                                    description: 'Часовий пояс для статичної SQL бази даних'
                                                },
                                                {key: 'INIT_REDIS_DYNAMIC_HOST', description: 'Динамічний хост Redis'},
                                                {key: 'INIT_REDIS_DYNAMIC_PORT', description: 'Динамічний порт Redis'},
                                                {
                                                    key: 'INIT_REDIS_DYNAMIC_PASSWORD',
                                                    description: 'Динамічний пароль Redis'
                                                },
                                                {
                                                    key: 'INIT_REDIS_CLIENT_DATABASE_PREFIX',
                                                    description: 'Не обовязовий Префікс до ключа редісу для отримання назви бази даних за доменом(по дефолту " ")'
                                                }
                                            
                                            ])
                                    )
                                    .appendChildren(
                                        new CodeBlock('getDynamicByDomainExample', 'db/getDynamicByDomainExample.tse')
                                            .setHeaderTitle('Приклад')
                                    )
                            )
                    )
            )
            .appendBlock(
                new CodeBlock('SqlMigrations', 'db/SqlMigrations.tse')
                    .setHeaderTitle('Sql migrations')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('SqlMigrations')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Клас для sql міграцій')
                    )
                    .appendChildren(
                        new TableBlock('SqlMigrationsTable')
                            .appendColumn({title: 'Метод', key: 'method'})
                            .appendColumn({title: 'Опис', key: 'description'})
                            .appendRows([
                                {
                                    method: 'renameColumn',
                                    description: 'Перейменовує існуючу колонку.'
                                },
                                {
                                    method: 'updateColumn',
                                    description: 'Оновлює параметри існуючої колонки.'
                                },
                                {
                                    method: 'removeColumns',
                                    description: 'Видаляє декілька колонок за назвами.'
                                },
                                {
                                    method: 'addColumns',
                                    description: 'Додає нові колонки до таблиці.'
                                },
                                {
                                    method: 'getColumns',
                                    description: 'Повертає опис усіх колонок у таблиці.'
                                },
                                {
                                    method: 'getTableName',
                                    description: 'Повертає назву таблиці, до якої застосовується міграція.'
                                },
                                {
                                    method: 'addAssociationHasMany',
                                    description: 'Додає звʼязок типу hasMany з іншою таблицею.'
                                },
                                {
                                    method: 'addAssociationHasOne',
                                    description: 'Додає звʼязок типу hasOne з іншою таблицею.'
                                },
                                {
                                    method: 'addAssociationBelongsTo',
                                    description: 'Додає звʼязок типу belongsTo з іншою таблицею.'
                                },
                                {
                                    method: 'addIndex',
                                    description: 'Додає індекс до таблиці.'
                                },
                                {
                                    method: 'deleteIndex',
                                    description: 'Видаляє індекс за назвою.'
                                }
                            ])
                    )
            )
    }
}

