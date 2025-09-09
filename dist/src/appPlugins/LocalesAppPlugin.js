"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalesAppPlugin = void 0;
class LocalesAppPlugin {
    constructor(locales, defaultLocale) {
        this.locales = locales;
        this.defaultLocale = defaultLocale;
    }
    register(app) {
        app.useMiddleware((req, res, next) => {
            res.locals.locales = this.locales;
            const parts = req.path.split('/');
            const potentialLocale = parts[1];
            if (potentialLocale && this.locales.includes(potentialLocale)) {
                res.locals.locale = potentialLocale;
                res.locals.originalUrlWithLocale = req.url;
                req.url = req.url.replace(new RegExp(`^/${potentialLocale}`), '') || '/';
            }
            else {
                res.locals.locale = this.defaultLocale || null;
            }
            next();
        });
    }
}
exports.LocalesAppPlugin = LocalesAppPlugin;
//# sourceMappingURL=LocalesAppPlugin.js.map