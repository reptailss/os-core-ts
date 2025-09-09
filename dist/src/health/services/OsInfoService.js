"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsInfoService = void 0;
const os_1 = __importDefault(require("os"));
const ip_1 = __importDefault(require("ip"));
const _logger_1 = require("../../logger");
const _appError_1 = require("../../appError");
class OsInfoService {
    async getOsInfo() {
        try {
            const cpus = os_1.default.cpus();
            const startMeasure = this.getCpuAverage();
            const startTime = process.hrtime();
            const startUsage = process.cpuUsage();
            await this.sleep(500);
            const elapTime = process.hrtime(startTime);
            const elapUsage = process.cpuUsage(startUsage);
            const elapTimeMS = this.secNSec2ms(elapTime);
            const elapUserMS = this.secNSec2ms(elapUsage.user);
            const elapSystMS = this.secNSec2ms(elapUsage.system);
            const cpuPercent = Math.round((100 * (elapUserMS + elapSystMS)) / elapTimeMS);
            const endMeasure = this.getCpuAverage();
            const idleDifference = endMeasure.idle - startMeasure.idle;
            const totalDifference = endMeasure.total - startMeasure.total;
            const osFree = this.calcMemory(os_1.default.freemem());
            const osTotal = this.calcMemory(os_1.default.totalmem());
            return {
                sys: {
                    name: os_1.default.hostname(),
                    ips: [ip_1.default.address()],
                    machine: process.env.INIT_NAME_OF_MACHINE || '',
                },
                cpu: {
                    model: cpus[0].model,
                    cores: cpus.length,
                    speed: cpus[0].speed,
                    os_used: 100 - ~~((100 * idleDifference) / totalDifference),
                    pr_used: cpuPercent,
                },
                ram: {
                    os_total: osTotal,
                    os_free: osFree,
                    os_used: Math.round(osTotal - osFree),
                    pr_used: this.calcMemory(process.memoryUsage().rss),
                },
            };
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get os info api', error);
            throw new _appError_1.AppError('os-core:Error get os info api', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
    }
    getCpuAverage() {
        let totalIdle = 0;
        let totalTick = 0;
        const cpus = os_1.default.cpus();
        for (let i = 0, len = cpus.length; i < len; i++) {
            const cpu = cpus[i];
            for (const type in cpu.times) {
                //@ts-ignore
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        }
        return {
            idle: totalIdle / cpus.length,
            total: totalTick / cpus.length,
        };
    }
    ;
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    secNSec2ms(secNSec) {
        if (Array.isArray(secNSec)) {
            return secNSec[0] * 1000 + secNSec[1] / 1000000;
        }
        return secNSec / 1000;
    }
    calcMemory(data) {
        return Math.round((data / 1024 / 1024) * 100) / 100;
    }
}
exports.OsInfoService = OsInfoService;
//# sourceMappingURL=OsInfoService.js.map