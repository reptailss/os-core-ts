const isDev = process.env.MODE === 'development'
export const ACTIONS_LOGGER_ROOT_PATH = isDev ?  '/' : '/dashboard/'
