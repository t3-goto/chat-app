import Express from 'express'
import helmet from 'helmet'
// ______________________________________________________
//
// Defines All Of The Optional Response Headers
//
interface Headers {
  [key: string]: string
}
const HEADERS: Headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-methods': 'GET, PUT, POST, DELETE, PATCH',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token',
} as const
// ______________________________________________________
//
// Set Optional Response Headers
//
const setHeaders = (app: Express.Application) => {
  app.use(
    (
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      for (const key in HEADERS) {
        res.header(key, HEADERS[key])
      }
      next()
    }
  )
}
// ______________________________________________________
//
// Use Helmet For Security Protection
//
const setHelmet = (app: Express.Application) => {
  app.use(helmet())
}
// ______________________________________________________
//
// Defines All Of The Application Response Middlewares
//
export const setResponseMiddlewares = (app: Express.Application) => {
  setHeaders(app)
  setHelmet(app)
}
