export declare class ClientPackagesHtmlBuilder {
    private readonly packageName;
    private html;
    constructor({ html, packageName, }: {
        html: string;
        packageName: string;
    });
    addServicePrefixToScriptsBundle(): this;
    addServicePrefixToWindow(): this;
    addServiceNameToTitle(): this;
    getHtml(): string;
}
