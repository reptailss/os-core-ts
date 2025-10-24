import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {TableBlock} from '@docBlocks/impl/TableBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {apiServicesDocModule} from '@appDocs/modules/apiServices'


type BlockNames = [
    'requiredEnvFields',
    'apiEnvUrls',
    'optionalEnvFields',
]

export class EnvDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init(): void {
        this.appendBlock(
            new TableBlock('requiredEnvFields')
                .setNavTitle('required env fields')
                .appendText(
                    new TextBlock().appendPrimaryText('Обовязкові поля ')
                )
                .appendColumn({key: 'key', title: 'Environment variable'})
                .appendColumn({key: 'description', title: 'Опис'})
                .appendColumn({key: 'example', title: 'Приклад'})
                .appendRows([
                    {key: 'INIT_SERVICE_KEY', description: 'Унікальний ключ для сервісу', example: 'products'},
                    {key: 'INIT_SERVICE_PREFIX', description: 'Префікс url сервісу', example: 'v1/products'},
                    {
                        key: 'INIT_SYSTEM_AUTH_TOKEN',
                        description: 'Токен авторизації для роботи системи',
                        example: 'Bearer eyJhbGciOiJIUzI1NiIsIn...'
                    },
                    {
                        key: 'INIT_SQL_DYNAMIC_DB_HOST',
                        description: 'Хост динамічної SQL бази даних',
                        example: 'localhost'
                    },
                    {key: 'INIT_SQL_DYNAMIC_DB_PORT', description: 'Порт динамічної SQL бази даних', example: '3306'},
                    {
                        key: 'INIT_SQL_DYNAMIC_DB_USERNAME',
                        description: 'Ім\'я користувача для динамічної SQL бази даних',
                        example: 'root'
                    },
                    {
                        key: 'INIT_SQL_DYNAMIC_DB_PASSWORD',
                        description: 'Пароль для динамічної SQL бази даних',
                        example: 'root'
                    },
                    {
                        key: 'INIT_SQL_STATIC_DB_DATABASE',
                        description: 'Назва статичної SQL бази даних',
                        example: 'socium'
                    },
                    {
                        key: 'INIT_SQL_STATIC_DB_HOST',
                        description: 'Хост статичної SQL бази даних',
                        example: 'localhost'
                    },
                    {key: 'INIT_SQL_STATIC_DB_PORT', description: 'Порт статичної SQL бази даних', example: '3306'},
                    {
                        key: 'INIT_SQL_STATIC_DB_USERNAME',
                        description: 'Ім\'я користувача для статичної SQL бази даних',
                        example: 'root'
                    },
                    {
                        key: 'INIT_SQL_STATIC_DB_PASSWORD',
                        description: 'Пароль для статичної SQL бази даних',
                        example: 'root'
                    },
                    {
                        key: 'INIT_MONGODB_PROTOCOL',
                        description: 'Протокол підключення до MongoDB',
                        example: 'mongodb://'
                    },
                    {key: 'INIT_MONGODB_HOST', description: 'Хост MongoDB', example: 'localhost'},
                    {key: 'INIT_MONGODB_PORT', description: 'Порт MongoDB', example: '27017'},
                    {key: 'INIT_MONGODB_USER', description: 'Ім\'я користувача MongoDB', example: 'root_user'},
                    {key: 'INIT_MONGODB_PASSWORD', description: 'Пароль MongoDB', example: 'password123'},
                    {
                        key: 'INIT_MONGODB_OPTIONS',
                        description: 'Додаткові опції підключення MongoDB',
                        example: 'retryWrites=true&w=majority'
                    },
                    
                    {key: 'INIT_REDIS_STATIC_HOST', description: 'Статичний хост Redis', example: 'localhost'},
                    {key: 'INIT_REDIS_STATIC_PORT', description: 'Статичний порт Redis', example: '6379'},
                    {key: 'INIT_REDIS_STATIC_PASSWORD', description: 'Статичний пароль Redis', example: 'pass123'},
                    {key: 'INIT_REDIS_DYNAMIC_HOST', description: 'Динамічний хост Redis', example: 'localhost'},
                    {key: 'INIT_REDIS_DYNAMIC_PORT', description: 'Динамічний порт Redis', example: '6380'},
                    {key: 'INIT_REDIS_DYNAMIC_PASSWORD', description: 'Динамічний пароль Redis', example: 'pass1234'}
                ])
        )
            .appendBlock(
                new TableBlock('apiEnvUrls')
                    .setNavTitle('api env urls')
                    .appendText(
                        new TextBlock().appendPrimaryText('Api urls')
                    )
                    .appendColumn({key: 'key', title: 'Environment variable'})
                    .appendColumn({key: 'description', title: 'Опис'})
                    .appendRows([
                        {
                            key: 'INIT_URL_AUTH_SERVICE',
                            description:
                                new TextBlock()
                                    .appendText('URL до')
                                    .appendLink(apiServicesDocModule.getPageBlockPath('authApiService', 'authApiService'), 'api сервісу авторизації')
                        },
                        {
                            key: 'INIT_URL_FOR_CHECK_AUTH',
                            description: new TextBlock()
                                .appendText('URL до ендпоінту "introspect"')
                                .appendLink(apiServicesDocModule.getPageBlockPath('authApiService', 'authApiService'), 'api сервісу авторизації')
                        },
                        {
                            key: 'INIT_URL_TO_ACTIONS_SYSTEM_LOGGER_SERVICE',
                            description: new TextBlock()
                                .appendText('URL до')
                                .appendLink(apiServicesDocModule.getPageBlockPath('actionsLoggerApiService', 'actionsLoggerApiService'), 'api сервісу логера дій')
                        },
                        {
                            key: 'INIT_URL_OS_STATUS_SERVICE',
                            description: new TextBlock()
                                .appendText('URL до')
                                .appendLink(apiServicesDocModule.getPageBlockPath('systemLoggerApiService', 'systemLoggerApiService'), 'api сервісу системних логів')
                        },
                        {
                            key:
                                'INIT_URL_STRUCTURE_ACCESS_SERVICE',
                            description:
                                new TextBlock()
                                    .appendText('URL до')
                                    .appendLink(apiServicesDocModule.getPageBlockPath('structureAccessApiService', 'structureAccessApiService'), 'api сервісу доступу по структурі')
                        },
                        {key: 'INIT_URL_STRUCTURE_SERVICE', description: 'URL для сервісу структури'},
                        {key: 'INIT_URL_WAREHOUSE_SETTINGS_SERVICE', description: 'URL для сервісу налаштувань складу'},
                        {key: 'INIT_URL_ORDERS_SERVICE', description: 'URL для сервісу замовлень'},
                        {key: 'INIT_URL_SOCIUM_USERS_SERVICE', description: 'URL для сервісу користувачів соціум'},
                        {key: 'INIT_URL_BMS_USERS_SERVICE', description: 'URL для сервісу користувачів бмс'},
                        {key: 'INIT_URL_PAYMENT_METHODS_SERVICE', description: 'URL для сервісу методів оплати'},
                        {key: 'INIT_URL_MOB_APP_SETTINGS_SERVICE', description: 'URL для сервісу налаштувань додатків'},
                        {key: 'INIT_URL_PTP_USERS_SERVICE', description: 'URL для сервісу client користувачів PTP'},
                        {key: 'INIT_URL_PTP_CORE_USERS_SERVICE', description: 'URL для  сервісу core користувачів PTP'},
                        {key: 'INIT_URL_PTP_CORE_GROUPS_SERVICE', description: 'URL для  сервісу core груп PTP'}
                    ])
            )
            .appendBlock(
                new TableBlock('optionalEnvFields')
                    .setNavTitle('optional env fields')
                    .appendText(
                        new TextBlock().appendPrimaryText('Не обовязкові поля')
                    )
                    .appendColumn({key: 'key', title: 'Environment variable'})
                    .appendColumn({key: 'defaultValue', title: 'Дефолтне значення'})
                    .appendColumn({key: 'description', title: 'Опис'})
                    .appendColumn({key: 'example', title: 'Приклад'})
                    .appendRows([
                        {
                            key: 'INIT_SERVICE_PORT',
                            defaultValue: '3000',
                            description: 'Порт для запуску сервісу Node.js',
                            example: '3000'
                        },
                        {
                            key: 'INIT_REDIS_CLIENT_DATABASE_PREFIX',
                            defaultValue: '" "',
                            description: 'Префікс до редісу для отримання назви бази даних за доменом',
                            example: 'ptp-core'
                        },
                        {
                            key: 'INIT_HAS_CONSOLE_LOGGER_REQUESTS',
                            defaultValue: '0',
                            description: 'Дублювати логування запитів у консоль (0,1)',
                            example: '1'
                        },
                        {
                            key: 'INIT_HAS_SEND_ACTION_SYSTEM_LOGGER',
                            defaultValue: '1',
                            description: 'Відправка інформації на сервіс про створення, редагування даних (0,1)',
                            example: '1'
                        },
                        {
                            key: 'INIT_SQL_DYNAMIC_DB_DIALECT',
                            defaultValue: 'mysql',
                            description: 'Діалект динамічної SQL бази даних (mysql, mariadb)',
                            example: 'mysql'
                        },
                        {
                            key: 'INIT_SQL_DYNAMIC_DB_ENCODING',
                            defaultValue: 'utf8',
                            description: 'Кодування динамічної SQL бази даних',
                            example: 'utf8'
                        },
                        {
                            key: 'INIT_SQL_DYNAMIC_DB_TIMEZONE',
                            defaultValue: '+00:00',
                            description: 'Часовий пояс для динамічної SQL бази даних',
                            example: '+03:00'
                        },
                        {
                            key: 'INIT_SQL_DYNAMIC_CHECK_READINESS_DATABASE_NAME',
                            description: 'Назва динамічної бази даних для тестування HEALTH модулем',
                            example: 'dynamic_db'
                        },
                        {
                            key: 'INIT_SQL_STATIC_DB_DIALECT',
                            defaultValue: 'mysql',
                            description: 'Діалект статичної SQL бази даних (mysql, mariadb)',
                            example: 'mysql'
                        },
                        {
                            key: 'INIT_SQL_STATIC_DB_ENCODING',
                            defaultValue: 'utf8',
                            description: 'Кодування статичної SQL бази даних',
                            example: 'utf8'
                        },
                        {
                            key: 'INIT_SQL_STATIC_DB_TIMEZONE',
                            defaultValue: '+00:00',
                            description: 'Часовий пояс для статичної SQL бази даних',
                            example: '+02:00'
                        },
                        {key: 'INIT_HAS_CORS', defaultValue: '1', description: 'Включення CORS (0,1)', example: '1'},
                        {
                            key: 'INIT_USE_STRUCTURE_ACCESS',
                            defaultValue: '0',
                            description: 'Використовувати доступ по сервісу структури (0,1)',
                            example: '1'
                        },
                     
                      
                        {
                            key: 'INIT_USE_SWAGGER',
                            defaultValue: '0',
                            description: 'Використання swagger (0,1)',
                            example: '1'
                        },
                        {
                            key: 'INIT_SWAGGER_URL',
                            defaultValue: 'http://localhost:{порт}',
                            description: 'URL для документації Swagger',
                            example: 'http://localhost:3000'
                        },
                        {
                            key: 'INIT_SWAGGER_DEFAULT_AUTH_TOKEN',
                            description: 'Дефолтний токен авторизації для swagger (виключно для дев режиму)',
                            example: 'Bearer eyJhbGciOiJIUzI....'
                        },
                        {key: 'INIT_AWS_S3_BUCKET', description: 'bucket для S3', example: 'my-app-bucket'},
                        {key: 'INIT_AWS_S3_REGION', description: 'Регіон для S3', example: 'eu-central-1'},
                        {key: 'INIT_AWS_S3_ACCESS_KEY', description: 'Ключ для S3', example: 'AKIAIOSFODNN7EXAMPLE'},
                        {
                            key: 'INIT_AWS_S3_SECRET_KEY',
                            description: 'Секрет для S3',
                            example: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
                        },
                        {
                            key: 'INIT_HAS_AWS_S3_UPLOAD',
                            defaultValue: '0',
                            description: 'Чи завантажувати файли на s3 (0 - локально)',
                            example: '1'
                        }
                    ])
            )
        
    }
}


