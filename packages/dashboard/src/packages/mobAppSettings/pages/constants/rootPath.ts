const isDev = process.env.MODE === 'development'
export const MOB_APP_SETTINGS_ROOT_PATH = isDev ?  '/' : '/dashboard/'
