import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import prettier from '@prettier/sync'

export class GmCodeBuilder {
    public build({
                         templatePath,
                         data,
                     }: {
        data: Record<string, unknown>
        templatePath: string
    }): string {

        const currentTemplatePath = path.join(
            __dirname,
            '../', '../', '../',
            'templates',
            'gm',
            path.join(...templatePath.split('/')),
        )

        const template = fs.readFileSync(currentTemplatePath, 'utf-8')

        const codes = ejs.render(template, data)

        return prettier.format(codes, {
            parser: 'typescript',
            semi: false,
            singleQuote: true,
            bracketSpacing: false,
            arrowParens: 'avoid',
            trailingComma: 'all',
            tabWidth: 4,
            printWidth: 100,
            alignProps: true,
        })
    }
}