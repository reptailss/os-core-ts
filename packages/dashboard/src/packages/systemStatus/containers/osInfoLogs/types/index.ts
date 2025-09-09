export interface SystemOsLog  {
    service_key: string
    date: Date
    sys_name: string
    sys_ips: string[]
    sys_machine: string
    cpu_model: string
    cpu_cores: number
    cpu_speed: number
    cpu_os_used: number
    cpu_pr_used: number
    ram_os_total: number,
    ram_os_free: number,
    ram_os_used: number,
    ram_pr_used: number,
    _id: string
    date_add: Date
    date_update: Date
}

export interface ResponseSystemOsLog {
    rows:SystemOsLog[]
    all_pages: number
    all_rows: number
    error: boolean
    page: number
    per_page: number
}