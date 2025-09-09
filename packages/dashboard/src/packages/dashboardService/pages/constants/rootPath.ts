const isDev = process.env.MODE === 'development'
export const DASHBOARD_SERVICE_ROOT_PATH = isDev ?  '/' : '/dashboard/'
export const DASHBOARD_SERVICE_ROOT_PATH_NAVIGATE = isDev ?  '/' : '/dashboard'
