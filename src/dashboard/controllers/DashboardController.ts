import {Controller, SendFileByPath, SendFile, SwaggerInfo} from '@decorators'
import path from 'path'
import fs from 'fs/promises'
import {ClientPackagesHtmlBuilder} from '@clientPackages'
import {SYSTEM_ROUTES} from '@systemRoutes'


@Controller()
export class DashboardController {

    @SwaggerInfo({
        disable: true,
    })
    @SendFileByPath(SYSTEM_ROUTES.dashboard.bundleJs)
    public getClientBundle(): string {
        return this.getFilePath('main.js')
    }

    @SwaggerInfo({
        disable: true,
    })
    @SendFileByPath(SYSTEM_ROUTES.dashboard.favicon)
    public getClientFavicon(): string {
        return this.getFilePath('favicon.ico')
    }

    @SwaggerInfo({
        disable: true,
    })
    @SendFile(SYSTEM_ROUTES.dashboard.index)
    public async getClientHtml(): Promise<string> {
        const html = await fs.readFile(
            this.getFilePath('index.html'), {
                encoding: 'utf-8',
            })

        const clientPackagesHtmlBuilder = new ClientPackagesHtmlBuilder({
            html,
            packageName: 'dashboard',
        })

        return clientPackagesHtmlBuilder
            .addServicePrefixToScriptsBundle()
            .addServicePrefixToWindow()
            .addServiceNameToTitle()
            .getHtml()
    }

    private getFilePath(fileName: string): string {
        return path.resolve(__dirname, '../', '../', '../', 'static', 'dashboard', fileName)

    }
}