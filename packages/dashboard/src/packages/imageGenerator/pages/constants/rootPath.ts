const isDev = process.env.MODE === 'development'
export const IMAGE_GENERATOR_ROOT_PATH = isDev ?  '/' : '/dashboard/'
