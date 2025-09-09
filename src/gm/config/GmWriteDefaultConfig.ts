import fs from 'fs'
import path from 'path'

import prettier from '@prettier/sync'
import {gmDefaultConfig, GmObjectStringifyHelper} from '@gm/core'


export class GmWriteDefaultConfig {
    static write() {
        const outputPath = path.resolve(process.cwd(), 'gCrudConfig.ts')

        fs.writeFileSync(outputPath, this.buildDefaultConfig(), 'utf-8')
    }

    private static buildDefaultConfig() {
        const baseInfo = `
    
    const sqlByStaticDb:GmSqlModelConfig = ${GmObjectStringifyHelper.objectToString(gmDefaultConfig.sqlByStaticDbConnection)}
   
    const sqlByDynamicDomain:GmSqlModelConfig = ${GmObjectStringifyHelper.objectToString(gmDefaultConfig.sqlByDynamicDomain)}
    
    const sqlByLeId:GmSqlModelConfig = ${GmObjectStringifyHelper.objectToString(gmDefaultConfig.sqlByDynamicLeId)}
    
    const noSqlByYearAndMonth:GmNoSqlModelConfig = ${GmObjectStringifyHelper.objectToString(gmDefaultConfig.noSqlByYearAndMonth)}
    
    `

        const file = `
    import {GmConfig, GmSqlModelConfig, GmNoSqlModelConfig, GmEndpointsConfig} from 'os-core-ts' \n${baseInfo}
    
  
    export default function buildGmConfig(): GmConfig {
                return {
                    dtoName: { 
                         singular:'User',
                         plural:'Users',
                    },
                    moduleName: 'Users',
                    model: sqlByDynamicDomain,
                    hasSeparated:true,
                    endpoints:${GmObjectStringifyHelper.objectToString(gmDefaultConfig.baseEndpoints)},
                    rootDir:'src',
                }
    }
    `
        return prettier.format(file, {
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

