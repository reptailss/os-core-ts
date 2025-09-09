export type OsInfo = {
    sys: {
        name: string
        ips: string[]
        machine: string
    };
    cpu: {
        model: string
        cores: number
        speed: number
        os_used: number
        pr_used: number
    };
    ram: {
        os_total: number
        os_free: number
        os_used: number
        pr_used: number
    };
}
