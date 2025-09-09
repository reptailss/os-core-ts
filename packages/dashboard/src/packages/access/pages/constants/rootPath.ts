const isDev = process.env.MODE === 'development'
export const ACCESS_ROOT_PATH = isDev ?  '/' : '/dashboard/'
