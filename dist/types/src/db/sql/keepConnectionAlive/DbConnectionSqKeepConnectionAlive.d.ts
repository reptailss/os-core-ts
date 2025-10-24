import { IDbConnectionSql } from "../..";
export declare class DbConnectionSqKeepConnectionAlive {
    private static isProcess;
    private static intervalId?;
    static keepConnectionAlive(connection: IDbConnectionSql): void;
    static stop(): void;
}
