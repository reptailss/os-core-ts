export type DbSqlOptions = {
    dbDatabase: string;
    dbUsername: string;
    dbPassword: string;
    charset: string;
    timezone: string;
    port: number;
    host: string;
    logging: boolean;
    dialect: 'mysql' | 'mariadb';
};
