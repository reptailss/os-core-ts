"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLoggerInitializer = void 0;
const winston_1 = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const core_1 = require("../../core");
class ConsoleLoggerInitializer {
    getInstance() {
        const { combine, timestamp, printf, errors, } = winston_1.format;
        const logFormat = printf(({ timestamp, level, message, stack }) => {
            return stack
                ? `${level}: ${timestamp} ${message}\nStack: ${stack}`
                : `${level}: ${timestamp} ${message}`;
        });
        return winston_1.default.createLogger({
            transports: [
                new winston_daily_rotate_file_1.default({
                    datePattern: core_1.ConsoleLoggerHelper.getDatePattern(),
                    dirname: core_1.ConsoleLoggerHelper.getDirPath(),
                    filename: core_1.ConsoleLoggerHelper.getFileName(),
                    maxFiles: 14,
                    json: false,
                    format: combine(errors({ stack: true }), timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss',
                    }), logFormat),
                    handleExceptions: true,
                }),
                new winston_1.default.transports.Console({
                    format: winston_1.default.format.combine(errors({ stack: true }), timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss',
                    }), winston_1.default.format.colorize(), logFormat),
                    handleExceptions: true,
                }),
            ],
        });
    }
}
exports.ConsoleLoggerInitializer = ConsoleLoggerInitializer;
//# sourceMappingURL=ConsoleLoggerInitializer.js.map