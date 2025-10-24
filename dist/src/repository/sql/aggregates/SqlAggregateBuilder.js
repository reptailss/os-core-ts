"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlAggregateBuilder = void 0;
class SqlAggregateBuilder {
    static sum({ columnKey, literal, }) {
        return {
            columnKey,
            fn: 'SUM',
            literal,
        };
    }
    static avg({ columnKey, literal, }) {
        return {
            columnKey,
            fn: 'AVG',
            literal,
        };
    }
    static max({ columnKey, literal, }) {
        return {
            columnKey,
            fn: 'MAX',
            literal,
        };
    }
    static min({ columnKey, literal, }) {
        return {
            columnKey,
            fn: 'MIN',
            literal,
        };
    }
}
exports.SqlAggregateBuilder = SqlAggregateBuilder;
//# sourceMappingURL=SqlAggregateBuilder.js.map