import Express from 'express'
import * as database from './config/database'
import { checkEnvVars, envVars } from './config/env'
import * as routes from './config/routes'
import * as logger from './helpers/logger'
import { setErrorHandlerMiddleware } from './middlewares/error-handler-middleware'
import { setRequestMiddlewares } from './middlewares/request-middleware'
import { setResponseMiddlewares } from './middlewares/response-middleware'
// ______________________________________________________
//
// Applicatoin's Request and Response Middlewares
//
const setMiddlewares = (app: Express.Application) => {
  setRequestMiddlewares(app)
  setResponseMiddlewares(app)
}
// ______________________________________________________
//
// Applicatoin's Routes
//
const setRoutes = (app: Express.Application) => {
  routes.setRoutes(app)
}
// ______________________________________________________
//
// Connect Database
//
const setDatabase = () => {
  database.setDatabase()
}
// ______________________________________________________
//
// Start Application Server
//
const listen = (app: Express.Application) => {
  checkEnvVars()
  setDatabase()
  setMiddlewares(app)
  setRoutes(app)
  setErrorHandlerMiddleware(app)

  if (!module.parent) {
    app.listen(envVars.APP_PORT, () => {
      logger.infoLog(`Node process is running at port : ${envVars.APP_PORT}`)
    })
  }
}

export const app = Express()
listen(app)
