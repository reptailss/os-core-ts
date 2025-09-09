const isDev = process.env.MODE === 'development'
export const MOBILE_APP_LOGS_ROOT_PATH = isDev ?  '/' : '/dashboard/'
