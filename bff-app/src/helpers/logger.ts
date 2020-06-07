// ______________________________________________________
//
// Use Logging Library 'winston'.
// For more details:
// https://github.com/winstonjs/winston and https://www.npmjs.com/package/winston
//
import winston from 'winston'
import { envVars } from './../config/env'
// ______________________________________________________
//
// Build Production's Logger
//
const buildProdLogger = () => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  })
}
// ______________________________________________________
//
// Build Development's Logger
//
const buildDevLogger = () => {
  return winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
      //
      // If we're not in production then log to the `console` with the format:
      // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
      //
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  })
}
// ______________________________________________________
//
// Select Logger
//
const logger = envVars.isProduction ? buildProdLogger() : buildDevLogger()
// ______________________________________________________
//
// Method: Output Error Log
//
export const errorLog = (logMsg: any) => {
  logger.error(logMsg)
}
// ______________________________________________________
//
// Method: Output Info Log
//
export const infoLog = (logMsg: any) => {
  logger.info(logMsg)
}
