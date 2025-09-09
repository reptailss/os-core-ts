import {IApp, IAppPlugin} from '@app'

export class LocalesAppPlugin implements IAppPlugin {
    constructor(
        private readonly locales: readonly string[],
        private readonly defaultLocale?: Readonly<string>,
    ) {
    }
    
    public register(app: IApp): void {
        app.useMiddleware((req, res, next) => {
            res.locals.locales = this.locales
            const parts = req.path.split('/')
            const potentialLocale = parts[1]
            if (potentialLocale && this.locales.includes(potentialLocale)) {
                res.locals.locale = potentialLocale
                res.locals.originalUrlWithLocale = req.url
                req.url = req.url.replace(new RegExp(`^/${potentialLocale}`), '') || '/'
            } else {
                res.locals.locale = this.defaultLocale || null
            }
            
            next()
        })
    }
}
