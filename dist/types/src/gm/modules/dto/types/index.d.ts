export type GmModuleDtoField = {
    key: string;
    type: 'number' | 'string' | 'object' | 'Date' | 'string[]' | 'number[]' | 'object[]' | 'boolean';
    columnType: 'INTEGER' | 'BIGINT' | 'FLOAT' | 'STRING' | 'TEXT' | 'JSON' | 'OBJECT' | 'DATETIME' | 'FILE' | 'OPEN_USER_ID' | 'BOOLEAN';
};
