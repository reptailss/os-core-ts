import { IApp, IAppPlugin } from "../app";
export declare class LocalesAppPlugin implements IAppPlugin {
    private readonly locales;
    private readonly defaultLocale?;
    constructor(locales: readonly string[], defaultLocale?: string | undefined);
    register(app: IApp): void;
}
