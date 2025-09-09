import {StringCaseHelper} from '@helpers'
import {GetGmConfig, GmGenerateCrudDecNoSql, GmGenerateCrudDecSql} from '@gm/core'
import path from 'path'
import fs from 'fs'


export class GenerateCrud {
    
    public async run() {
        const config = await GetGmConfig.getConfig()
        const dirName = StringCaseHelper.toCamelCase(config.moduleName)
        const rootDir = config.rootDir || 'src'
        const rootDirArray = rootDir.split('/')
        const rootPath = path.resolve(process.cwd(), ...rootDirArray, 'modules', dirName)
        
        
        if (fs.existsSync(rootPath)) {
            throw new Error(`the folder ${dirName} already exists`)
        }
        
        switch (config.model.dbType) {
            case 'sql' : {
                new GmGenerateCrudDecSql(config).run()
                break
            }
            case 'noSql' : {
                new GmGenerateCrudDecNoSql(config).run()
                break
            }
        }
    }
}