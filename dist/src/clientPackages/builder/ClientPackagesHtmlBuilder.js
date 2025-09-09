"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPackagesHtmlBuilder = void 0;
const _appConfig_1 = require("../../appConfig");
class ClientPackagesHtmlBuilder {
    constructor({ html, packageName, }) {
        this.packageName = packageName;
        this.html = html;
    }
    addServicePrefixToScriptsBundle() {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.servicePrefix) {
            return this;
        }
        this.html = this.html.replace(`src="/${this.packageName}/main.js"`, `src="/${_appConfig_1.APP_CONFIG_OS_CORE.servicePrefix}/${this.packageName}/main.js"`)
            .replace(`href="/${this.packageName}/favicon.ico"`, `href="/${_appConfig_1.APP_CONFIG_OS_CORE.servicePrefix}/${this.packageName}/favicon.ico"`);
        return this;
    }
    addServicePrefixToWindow() {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.servicePrefix) {
            return this;
        }
        this.html = this.html.replace(`</body>`, `<script>window._servicePrefix = "${_appConfig_1.APP_CONFIG_OS_CORE.servicePrefix}"</script></body>`);
        return this;
    }
    addServiceNameToTitle() {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.serviceKey) {
            return this;
        }
        this.html = this.html.replace(`<title>OneSoft ${this.packageName}</title>`, `<title>OneSoft ${_appConfig_1.APP_CONFIG_OS_CORE.serviceKey} ${this.packageName}</title>`);
        return this;
    }
    getHtml() {
        return this.html;
    }
}
exports.ClientPackagesHtmlBuilder = ClientPackagesHtmlBuilder;
//# sourceMappingURL=ClientPackagesHtmlBuilder.js.map