import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {IDocPage} from '@docPage/interfaces'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {TitleBlock} from '@docBlocks/impl/TitleBlock'
import {appModuleDocModule} from '@appDocs/modules/appModule'
import {envDocModule} from '@appDocs/modules/env'


type BlockNames = [
    'IApp',
    'App',
    'useModule',
    'useCors',
    'useStatic',
    'useHealth',
    'useDashboard',
    'useSwagger',
    'useRequestLogger',
    'useConsoleLogger',
    'useImportStructureServiceEndpoints',
    'usePlugin',
    'useNotFoundRoute',
    'enableSystemModulesFromEnv',
    'useMiddleware',
    'overrideProvider',
    'initModules',
    'listen',
    'routerBuilder'
]

export class AppDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this
            .setNavTitle('App')
            .appendBlock(
                new CodeBlock('App', 'app/newApp.tse')
                    .appendText(new TextBlock().appendText('Ініціалізація додатку')).setNavTitle('init app')
            )
            .appendBlock(
                new CodeBlock('IApp', 'app/IApp.tse')
                    .appendText(
                        new TextBlock()
                            .appendPrimaryText('IApp - Інтерфейс для роботи з додатком')
                    )
            )
            .appendBlock(
                new TitleBlock('useModule')
                    .setNavTitle('useModule')
                    .appendText(
                        new TextBlock().appendPrimaryText('useModule()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Додає')
                            .appendLinkFromObject(appModuleDocModule.getBlockPathAndTitle('appModule', 'IAppModule'))
                            .appendText('до додатку та рекурсивно підставляє залежності починаючи з контролерів')
                    )
            )
            .appendBlock(
                new TitleBlock('useCors')
                    .setNavTitle('useCors')
                    .appendText(
                        new TextBlock().appendPrimaryText('useCors()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Вмикає cors налаштування')
                    )
            )
            .appendBlock(
                new TitleBlock('useStatic')
                    .setNavTitle('useStatic')
                    .appendText(
                        new TextBlock().appendPrimaryText('useStatic()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Для обслуговування статичний файлів, приймає аргументом шлях до папки з файлами')
                    )
            )
            .appendBlock(
                new TitleBlock('useHealth')
                    .setNavTitle('useHealth')
                    .appendText(
                        new TextBlock().appendPrimaryText('useHealth()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Реєструє базовий health-check endpoint (наприклад, /health), який повертає статус роботи додатку.')
                    )
            )
            .appendBlock(
                new TitleBlock('useDashboard')
                    .setNavTitle('useDashboard')
                    .appendText(
                        new TextBlock().appendPrimaryText('useDashboard()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Додає просту dashboard-сторінку для моніторингу стану додатку, логів або системних модулів.')
                    )
            )
            .appendBlock(
                new TitleBlock('useSwagger')
                    .setNavTitle('useSwagger')
                    .appendText(
                        new TextBlock().appendPrimaryText('useSwagger()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Вмикає Swagger-документацію для API. Дозволяє переглядати всі доступні ендпоїнти та DTO.')
                    )
            )
            .appendBlock(
                new TitleBlock('useRequestLogger')
                    .setNavTitle('useRequestLogger')
                    .appendText(
                        new TextBlock().appendPrimaryText('useRequestLogger()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Реєструє middleware для логування кожного HTTP-запиту (метод, шлях, статус, час обробки).')
                    )
            )
            .appendBlock(
                new TitleBlock('useConsoleLogger')
                    .setNavTitle('useConsoleLogger')
                    .appendText(
                        new TextBlock().appendPrimaryText('useConsoleLogger()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Вмикає логування в консоль та в файли через')
                            .appendCodeLink('{{appLogger}}')
                    )
            )
            .appendBlock(
                new TitleBlock('useImportStructureServiceEndpoints')
                    .setNavTitle('useImportStructureServiceEndpoints')
                    .appendText(
                        new TextBlock().appendPrimaryText('useImportStructureServiceEndpoints(type)').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Імпортує службові ендпоїнти структури сервісу. Параметр ')
                            .appendText('приймає значення типу:"default" | "plugin"')
                    )
            )
            .appendBlock(
                new TitleBlock('usePlugin')
                    .setNavTitle('usePlugin')
                    .appendText(
                        new TextBlock().appendPrimaryText('usePlugin(plugin)').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Підключає плагін, який реалізує інтерфейс ')
                            .appendCodeLink('IAppPlugin')
                            .appendText('. Плагін може реєструвати свої модулі, роутери або middlewares')
                    )
            )
            .appendBlock(
                new TitleBlock('useNotFoundRoute')
                    .setNavTitle('useNotFoundRoute')
                    .appendText(
                        new TextBlock().appendPrimaryText('useNotFoundRoute(handler)').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Реєструє обробник 404 маршруту, який викликається, якщо жоден інший роут не підійшов. ')
                            .appendText('Передає у вигляді аргументу ')
                            .appendCodeLink('AppRouterRequestHandler')
                            .appendText('.')
                    )
            )
            .appendBlock(
                new TitleBlock('enableSystemModulesFromEnv')
                    .setNavTitle('enableSystemModulesFromEnv')
                    .appendText(
                        new TextBlock().appendPrimaryText('enableSystemModulesFromEnv()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Вмикає системні модулі (CORS, Swagger, RequestLogger) на основі конфігурації з ')
                            .appendLinkFromObject(envDocModule.getBlockPathAndTitle('env','optionalEnvFields'))
                            .appendText('. Якщо викликано цей метод, локальні виклики useCors(),useSwagger(),useRequestLogger()  — ігноруються.')
                         
                    )
            )
            .appendBlock(
                new TitleBlock('useMiddleware')
                    .setNavTitle('useMiddleware')
                    .appendText(
                        new TextBlock().appendPrimaryText('useMiddleware(middleware)').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Додає власне middleware (аналог Express). Приймає функцію з аргументами (req, res, next)')
                    )
            )
            .appendBlock(
                new TitleBlock('overrideProvider')
                    .setNavTitle('overrideProvider')
                    .appendText(
                        new TextBlock().appendPrimaryText('overrideProvider(target, options)').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Перевизначає DI-провайдер у контейнері залежностей. Дозволяє вказати useClass, useValue або useFactory  з вибором життєвого циклу (')
                            .appendCodeLink('{{DiLifetime}} ).')
                    )
            )
            .appendBlock(
                new TitleBlock('initModules')
                    .setNavTitle('initModules')
                    .appendText(
                        new TextBlock().appendPrimaryText('initModules()').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Ініціалізує всі модулі, зареєстровані через useModule()')
                            .appendText('. Має бути викликаний перед listen()')
                    )
            )
            .appendBlock(
                new TitleBlock('listen')
                    .setNavTitle('listen')
                    .appendText(
                        new TextBlock().appendPrimaryText('listen(port?, callback?)').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Запускає HTTP-сервер. Повертає ')
                            .appendCodeLink('http.Server')
                            .appendText('. Може приймати порт і callback для обробки події запуску.')
                    )
            )
            .appendBlock(
                new TitleBlock('routerBuilder')
                    .setNavTitle('routerBuilder')
                    .appendText(
                        new TextBlock().appendPrimaryText('routerBuilder: IRouterBuilder').setVariant('h6')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Екземпляр RouterBuilder, який використовується для створення маршрутизаторів на основі контролерів. ')
                            // .appendLinkFromObject(appModuleDocModule.getBlockPathAndTitle('appModule', 'IRouterBuilder'))
                    )
            )
           
        
        
    }
}

