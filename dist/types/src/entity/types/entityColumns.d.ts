export type EntityColumn = {
    allowNull?: boolean;
    type: 'INTEGER';
    options?: {
        length?: number;
    };
    defaultValue?: number | null;
} | {
    allowNull?: boolean;
    type: 'BIGINT';
    options?: {
        length?: number;
    };
    defaultValue?: number | null;
} | {
    allowNull?: boolean;
    type: 'FLOAT';
    options?: {
        length?: number;
    };
    defaultValue?: number | null;
} | {
    allowNull?: boolean;
    type: 'BOOLEAN';
    options?: {};
    defaultValue?: boolean | null;
} | {
    allowNull?: boolean;
    type: 'STRING';
    options?: {
        length?: number;
    };
    defaultValue?: string | null;
} | {
    allowNull?: boolean;
    type: 'TEXT';
    options?: {
        length?: 'tiny' | 'medium' | 'long';
    };
    defaultValue?: string;
} | {
    type: 'DATETIME';
    defaultValue?: Date | 'CURRENT_TIMESTAMP' | null;
    allowNull?: boolean;
} | {
    type: 'JSON';
    defaultValue?: object | null;
    allowNull?: boolean;
} | {
    type: 'PRIMARY_KEY';
    allowNull?: boolean;
    autoIncrement?: boolean;
};
