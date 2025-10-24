import {Connection, Model} from 'mongoose'
import {appLogger} from '@logger'
import {NoSqlIndexes} from '@repository/core'
import {Entity, EntityClass} from '@entity'

type OldIndex = {
    key: Record<string, 1 | -1>;
    name: string;
}
type MongooseModel<T extends object> = Model<T>

export class DbConnectionNoSqIndexes<ClassEntity extends object> {
    constructor(private readonly entity: ClassEntity) {
    }
    
    public async initIndexesMongoose({
                                         indexes,
                                         model,
                                         dbConnection,
                                         collectionName,
                                     }: {
        indexes: NoSqlIndexes<ClassEntity>
        model: MongooseModel<Entity<ClassEntity>>
        dbConnection: Connection
        collectionName: string
    }) {
        const entity: EntityClass = this.entity as EntityClass
        
        const collections = await dbConnection.db?.listCollections({name: collectionName}).toArray()
        if (!collections?.length) {
            await dbConnection.createCollection(collectionName)
            appLogger.info(`os-core:Mongodb create collection: ${collectionName}`)
        }
        
        const oldIndexes: OldIndex[] = await model.collection.listIndexes().toArray()
        
        const newIndexKeys = new Set<string>()
        for (const index of indexes) {
            newIndexKeys.add(this.getKeyByColumns(index.columns))
        }
        
        for (const oldIndex of oldIndexes) {
            const primaryIndexName = `${entity._primaryKey || '_id'}_`
            if (oldIndex.name === primaryIndexName) {
                continue
            }
            
            const oldKey = this.getKeyByColumns(oldIndex.key)
            if (!newIndexKeys.has(oldKey)) {
                try {
                    await dbConnection.collection(collectionName).dropIndex(oldIndex.name)
                    appLogger.info(`os-core:Mongodb dropped outdated index ${oldIndex.name} (${oldKey})`)
                } catch (error) {
                    appLogger.error(`os-core:Mongodb failed to drop index ${oldIndex.name}:`, error)
                }
            }
        }
        
        const updatedIndexes: OldIndex[] = await model.collection.listIndexes().toArray()
        const existingIndexKeys = new Set<string>()
        for (const i of updatedIndexes) {
            existingIndexKeys.add(this.getKeyByColumns(i.key))
        }
        
        for (const index of indexes) {
            const newKey = this.getKeyByColumns(index.columns)
            if (existingIndexKeys.has(newKey)) {
                continue
            }
            
            try {
                await dbConnection.collection(collectionName).createIndex(index.columns, index.options)
                appLogger.info(`os-core:Mongodb created index on ${collectionName}: ${newKey}`)
            } catch (error) {
                appLogger.error(`os-core:Mongodb failed to create index ${newKey}:`, error)
            }
        }
    }
    
    private getKeyByColumns(columns: Record<string, 1 | -1>): string {
        if (!columns) return ''
        return Object.entries(columns)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([field, direction]) => `${field}:${direction}`)
            .join('|')
    }
}
