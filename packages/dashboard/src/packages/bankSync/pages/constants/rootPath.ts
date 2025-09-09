const isDev = process.env.MODE === 'development'
export const BANK_SYNC_ROOT_PATH = isDev ?  '/' : '/dashboard/'

