"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOsStatusOsInfoService = void 0;
const _health_1 = require("../../../health");
const _appConfig_1 = require("../../../appConfig");
class GetOsStatusOsInfoService {
    constructor(osInfoService = new _health_1.OsInfoService()) {
        this.osInfoService = osInfoService;
    }
    async getOsInfo() {
        const osInfo = await this.osInfoService.getOsInfo();
        return {
            service_key: _appConfig_1.APP_CONFIG_OS_CORE.serviceKey,
            date: new Date().toISOString(),
            sys_name: osInfo.sys.name,
            sys_ips: osInfo.sys.ips,
            sys_machine: osInfo.sys.machine,
            cpu_model: osInfo.cpu.model,
            cpu_cores: osInfo.cpu.cores,
            cpu_speed: osInfo.cpu.speed,
            cpu_os_used: osInfo.cpu.os_used,
            cpu_pr_used: osInfo.cpu.pr_used,
            ram_os_total: osInfo.ram.os_total,
            ram_os_free: osInfo.ram.os_free,
            ram_os_used: osInfo.ram.os_used,
            ram_pr_used: osInfo.ram.pr_used,
        };
    }
}
exports.GetOsStatusOsInfoService = GetOsStatusOsInfoService;
//# sourceMappingURL=GetOsStatusOsInfo.js.map