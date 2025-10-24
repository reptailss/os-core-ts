import {Controller, Get, SendFile, SendFileByPath, SwaggerInfo} from '@decorators'
import path from 'path'
import fs from 'fs/promises'
import {ClientPackagesHtmlBuilder} from '@clientPackages'
import {SYSTEM_ROUTES} from '@systemRoutes'

import {GetSwaggerService, Swagger} from '@swagger/core'


@Controller()
export class SwaggerController {
    
    private readonly getSwaggerService: GetSwaggerService = new GetSwaggerService()
    
    @SwaggerInfo({
        disable: true,
    })
    @Get(SYSTEM_ROUTES.swagger.swaggerSpec)
    public async getSwagger(): Promise<Swagger> {
        return this.getSwaggerService.getSwagger()
    }
    
    @SwaggerInfo({
        disable: true,
    })
    @SendFileByPath(SYSTEM_ROUTES.swagger.bundleJs)
    public getClientBundle(): string {
        return this.getFilePath('main.js')
    }
    
    @SwaggerInfo({
        disable: true,
    })
    @SendFileByPath(SYSTEM_ROUTES.swagger.favicon)
    public getClientFavicon(): string {
        return this.getFilePath('favicon.ico')
    }
    
    @SwaggerInfo({
        disable: true,
    })
    @SendFile(SYSTEM_ROUTES.swagger.index)
    public async getClientHtml(): Promise<string> {
        const html = await fs.readFile(
            this.getFilePath('index.html'), {
                encoding: 'utf-8',
            })
        
        const clientPackagesHtmlBuilder = new ClientPackagesHtmlBuilder({
            html,
            packageName: 'swagger',
        })
        
        return clientPackagesHtmlBuilder
            .addServicePrefixToScriptsBundle()
            .addServicePrefixToWindow()
            .addServiceNameToTitle()
            .getHtml()
    }
    
    private getFilePath(fileName: string): string {
        return path.resolve(__dirname, '../', '../', '../', 'static', 'swagger', fileName)
        
    }
}