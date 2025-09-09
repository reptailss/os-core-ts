const isDev = process.env.MODE === 'development'
export const SYSTEM_STATUS_ROOT_PATH = isDev ?  '/' : '/dashboard/'
export const SYSTEM_STATUS_ROOT_PATH_NAVIGATE = isDev ?  '/' : '/dashboard'
