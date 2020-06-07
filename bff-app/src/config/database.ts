import mongoose from 'mongoose'
import { envVars } from './../config/env'
import { SystemError } from './../errors/systemError'
import * as logger from './../helpers/logger'
// ______________________________________________________
//
// Connect To Database Server
//
const startDatabese = () => {
  try {
    if (envVars === undefined || envVars.dbUri === undefined) {
      throw new SystemError()
    }
    mongoose
      .connect(envVars.dbUri as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        logger.infoLog('Node process is connected to database')
      })
  } catch (err) {
    logger.errorLog('Node process can not connected to database')
    throw new SystemError()
  }
}
// ______________________________________________________
//
// Set Database
//
export const setDatabase = () => {
  startDatabese()
}
