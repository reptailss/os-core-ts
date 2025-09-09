"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConsoleLogsService = void 0;
const _helpers_1 = require("../../../helpers");
const core_1 = require("../../core");
const fs_1 = require("fs");
class GetConsoleLogsService {
    async getLogs({ dateEnd, dateStart, }) {
        const intervals = _helpers_1.DateHelper.generateDateIntervalsByDayRange(dateStart, dateEnd);
        if (!intervals.length) {
            return [];
        }
        const res = [];
        for (const interval of intervals) {
            try {
                const logsFolderPath = core_1.ConsoleLoggerHelper.getFilePath({
                    year: interval.year,
                    month: interval.month,
                    day: interval.day,
                });
                const str = await fs_1.promises.readFile(logsFolderPath, 'utf8');
                const array = str === null || str === void 0 ? void 0 : str.split(/\r?\n/);
                if (!(array === null || array === void 0 ? void 0 : array.length)) {
                    continue;
                }
                array.forEach((line) => {
                    res.push(line);
                });
            }
            catch (error) {
            }
        }
        return res;
    }
}
exports.GetConsoleLogsService = GetConsoleLogsService;
//# sourceMappingURL=GetConsoleLogsService.js.map