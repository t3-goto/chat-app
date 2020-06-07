import { SystemError } from './../errors/systemError'
// ______________________________________________________
//
// Defines All Of The Application Environment Variables
//
interface EnvVars {
  [key: string]: any
}
export const envVars: EnvVars = {
  NODE_ENV: process.env.NODE_ENV,
  APP_PORT: process.env.APP_PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  dbUri: process.env.DB_URI,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const
// ______________________________________________________
//
// Method: Check Environment Variables Is Setted. Do Duaring Server Initialization
//
export const checkEnvVars = () => {
  for (const key in envVars) {
    if (key === null) {
      throw new SystemError()
    }
    if (envVars[key] === undefined) {
      throw new SystemError(
        `${key} is not set. ${key} should be passed as the environment variable.`
      )
    }
  }
}
