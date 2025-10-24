import os from 'os'
import ip from 'ip'
import {OsInfo} from '@health'
import {appLogger} from '@logger'
import {AppError} from '@appError'
import {Injectable} from '@decorators'


export class OsInfoService {
    
    public async getOsInfo(): Promise<OsInfo> {
        try {
            const cpus = os.cpus()
            
            const startMeasure = this.getCpuAverage()
            const startTime = process.hrtime()
            const startUsage = process.cpuUsage()
            await this.sleep(500)
            
            const elapTime = process.hrtime(startTime)
            const elapUsage = process.cpuUsage(startUsage)
            const elapTimeMS = this.secNSec2ms(elapTime)
            const elapUserMS = this.secNSec2ms(elapUsage.user)
            const elapSystMS = this.secNSec2ms(elapUsage.system)
            const cpuPercent = Math.round((100 * (elapUserMS + elapSystMS)) / elapTimeMS)
            const endMeasure = this.getCpuAverage()
            const idleDifference = endMeasure.idle - startMeasure.idle
            const totalDifference = endMeasure.total - startMeasure.total
            const osFree = this.calcMemory(os.freemem())
            const osTotal = this.calcMemory(os.totalmem())
            
            return {
                sys: {
                    name: os.hostname(),
                    ips: [ip.address()],
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
                server_time:{
                    utc: new Date().toISOString(),
                    local: new Date().toString(),
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                }
            }
        } catch (error) {
            appLogger.error('os-core:Error get os info api', error)
            throw new AppError('os-core:Error get os info api', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        
    }
    
    private getCpuAverage(): {
        idle: number,
        total: number
    } {
        let totalIdle = 0
        let totalTick = 0
        const cpus = os.cpus()
        for (let i = 0, len = cpus.length; i < len; i++) {
            const cpu = cpus[i]
            for (const type in cpu.times) {
                //@ts-ignore
                totalTick += cpu.times[type]
            }
            totalIdle += cpu.times.idle
        }
        return {
            idle: totalIdle / cpus.length,
            total: totalTick / cpus.length,
        }
    };
    
    private sleep(ms: number): Promise<number> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }
    
    private secNSec2ms(secNSec: number | number[]): number {
        if (Array.isArray(secNSec)) {
            return secNSec[0] * 1000 + secNSec[1] / 1000000
        }
        return secNSec / 1000
    }
    
    private calcMemory(data: number): number {
        return Math.round((data / 1024 / 1024) * 100) / 100
    }
    
}