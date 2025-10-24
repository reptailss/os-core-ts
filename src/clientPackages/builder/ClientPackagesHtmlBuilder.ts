import {APP_CONFIG_OS_CORE} from '@appConfig'

export class ClientPackagesHtmlBuilder {
    private readonly packageName: string
    private html: string
    
    constructor({
                    html,
                    packageName,
                }: {
        html: string,
        packageName: string
    }) {
        this.packageName = packageName
        this.html = html
    }
    
    public addServicePrefixToScriptsBundle(): this {
        if (
            !APP_CONFIG_OS_CORE.servicePrefix
        ) {
            return this
        }
        this.html = this.html.replace(`src="/${this.packageName}/main.js"`, `src="/${APP_CONFIG_OS_CORE.servicePrefix}/${this.packageName}/main.js"`)
            .replace(`href="/${this.packageName}/favicon.ico"`, `href="/${APP_CONFIG_OS_CORE.servicePrefix}/${this.packageName}/favicon.ico"`)
        
        return this
    }
    
    public addServicePrefixToWindow(): this {
        if (
            !APP_CONFIG_OS_CORE.servicePrefix
        ) {
            return this
        }
        this.html = this.html.replace(`</body>`, `<script>window._servicePrefix = "${APP_CONFIG_OS_CORE.servicePrefix}"</script></body>`)
        
        return this
    }
    
    public addServiceNameToTitle(): this {
        if (
            !APP_CONFIG_OS_CORE.serviceKey
        ) {
            return this
        }
        this.html = this.html.replace(`<title>OneSoft ${this.packageName}</title>`, `<title>OneSoft ${APP_CONFIG_OS_CORE.serviceKey} ${this.packageName}</title>`)
        return this
    }
    
    
    public getHtml(): string {
        return this.html
    }
}

