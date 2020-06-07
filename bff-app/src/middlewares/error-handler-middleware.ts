import Express from 'express'
import createError, { HttpError } from 'http-errors'
import { envVars } from './../config/env'
import * as logger from './../helpers/logger'
import { Response, sendResponse } from './../helpers/response'
// ______________________________________________________
//
// Set Default Handler For Forward To Error Handler With 404 Not Found
//
const setDefaultHander = (app: Express.Application) => {
  app.use(
    (
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      next(createError(404))
    }
  )
}
// ______________________________________________________
//
// Set Error Handler
//
const setErrorHandler = (app: Express.Application) => {
  app.use(
    (
      err: HttpError,
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      if (!envVars.isProduction) {
        logger.infoLog(err.message)
      }
      return sendResponse(
        res,
        err.status || 500,
        new Response({
          error: { code: 'CMN0000001', message: 'Your request is incorrect' },
        })
      )
    }
  )
}
// ______________________________________________________
//
// Defines All Of The Application Error Handler Middlewares
//
export const setErrorHandlerMiddleware = (app: Express.Application) => {
  setDefaultHander(app)
  setErrorHandler(app)
}
