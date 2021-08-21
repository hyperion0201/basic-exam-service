// declare env variables that required for app

export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000

export const DEBUGGING_ENABLED = process.env.DEBUGGING_ENABLED === 'true'

export const DB_LOGGING_ENABLED = process.env.DB_LOGGING_ENABLED === 'true'

export const ROOT_APP_NAMESPACE = process.env.ROOT_APP_NAMESPACE || 'server'

export const JWT_SECRET = process.env.JWT_SECRET || 'slowdancingintheburningroom'

export const DB_HOST = process.env.DB_HOST || 'localhost'

export const DB_USER = process.env.DB_USER || 'postgres'

export const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres'

export const DB_NAME = process.env.DB_NAME || 'exam'

export const DB_PORT = Number(process.env.DB_PORT) || 5432