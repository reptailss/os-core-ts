import {OsInfoService} from '@health'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {OsStatusLoggerInfo} from '@logger/core'


export class GetOsStatusOsInfoService {
    private readonly osInfoService = new OsInfoService()
    
    public async getOsInfo(): Promise<OsStatusLoggerInfo> {
        const osInfo = await this.osInfoService.getOsInfo()
        return {
            service_key: APP_CONFIG_OS_CORE.serviceKey,
            date: new Date().toISOString() as any as Date,
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
        }

    }
}