import {NoSqlIndexes} from '@model'
import {Connection, Model} from 'mongoose'
import {appLogger} from '@logger'

type OldIndex = {
    key: Record<string, 1 | -1>;
    name: string;
}
type MongooseModel<T extends object> = Model<T>

export class DbConnectionNoSqIndexes {

    public initIndexesMongoose = async <
        Row extends object,
        RowDateAddKey extends string = 'date_add',
        RowDateUpdateKey extends string = 'date_update',
    >({
          indexes,
          model,
          dbConnection,
          collectionName,
      }: {
        indexes?: NoSqlIndexes<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >,
        model: MongooseModel<Row>,
        dbConnection: Connection
        collectionName: string;
    }) => {

        if (!indexes?.length) {
            return
        }

        const collections = await dbConnection.db?.listCollections({name: collectionName}).toArray()
        if (!collections || !collections.length) {
            await dbConnection.createCollection(collectionName)
            appLogger.info(`os-core:Mongodb create collection:${collectionName}`)
        }

        const oldIndexes: OldIndex[] = await model.collection.listIndexes().toArray()

        const oldIndexesByColumns: Record<string, boolean> = {}

        if (oldIndexes.length) {
            oldIndexes.forEach((index) => {
                const key = this.getKeyByColumns(index.key)
                oldIndexesByColumns[index?.name] = true
                oldIndexesByColumns[key] = true
            })
        }


        for (const index of indexes) {
            if (index?.options?.name && index?.options?.name in oldIndexesByColumns) {
                continue
            }
            const key = this.getKeyByColumns(index.columns)
            if (key in oldIndexesByColumns) {
                continue
            }

            try {
                await dbConnection.collection(collectionName).createIndex(index.columns, index.options)
            } catch (error) {
                appLogger.error(error)
            }
        }

    }

    private getKeyByColumns(columns: Record<string, 1 | -1>): string {
        if (!columns) {
            return ''
        }
        const keys = Object.entries(columns)?.map(([key, value]) => `${key}_${value}`)
        return keys?.sort()?.join('_')
    }

}